import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Calculator, Download, Share2, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import * as XLSX from 'xlsx';

interface EMIResult {
  emi: number;
  totalAmount: number;
  totalInterest: number;
  principalAmount: number;
  processingFees: number;
  insurance: number;
  registrationCharges: number;
  totalUpfrontCost: number;
}

const saveCalculationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
});

type SaveCalculationData = z.infer<typeof saveCalculationSchema>;

interface EMICalculatorFormProps {
  className?: string;
  defaultPrice?: number;
}

export const EMICalculatorForm: React.FC<EMICalculatorFormProps> = ({
  className = "",
  defaultPrice = 3500000,
}) => {
  const [loanAmount, setLoanAmount] = useState([defaultPrice * 0.8]); // 80% of property price
  const [interestRate, setInterestRate] = useState([9.0]);
  const [tenure, setTenure] = useState([15]);
  const [result, setResult] = useState<EMIResult | null>(null);
  const [showSaveForm, setShowSaveForm] = useState(false);
  const { toast } = useToast();

  const form = useForm<SaveCalculationData>({
    resolver: zodResolver(saveCalculationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  const calculateEMI = () => {
    const principal = loanAmount[0];
    const rate = interestRate[0] / 12 / 100; // Monthly interest rate
    const time = tenure[0] * 12; // Number of months

    if (principal > 0 && rate > 0 && time > 0) {
      const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
      const totalAmount = emi * time;
      const totalInterest = totalAmount - principal;
      
      // Additional costs for Tamil Nadu/Madurai market
      const processingFees = Math.round(principal * 0.005); // 0.5% processing fee
      const insurance = Math.round(principal * 0.003); // 0.3% insurance premium
      const registrationCharges = Math.round(principal * 0.007); // 0.7% registration charges (TN)
      const totalUpfrontCost = processingFees + insurance + registrationCharges;

      setResult({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principalAmount: principal,
        processingFees,
        insurance,
        registrationCharges,
        totalUpfrontCost,
      });
    }
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, tenure]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatLakhs = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    }
    return formatCurrency(amount);
  };

  const downloadCalculation = () => {
    if (!result) return;

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    
    // Create data for the Excel sheet
    const data = [
      ['EMI CALCULATION REPORT', ''],
      ['', ''],
      ['Property Loan Details', ''],
      ['Loan Amount', result.principalAmount],
      ['Interest Rate', `${interestRate[0]}%`],
      ['Loan Tenure', `${tenure[0]} years`],
      ['', ''],
      ['Monthly EMI Breakdown', ''],
      ['Monthly EMI', result.emi],
      ['Total Amount Payable', result.totalAmount],
      ['Total Interest', result.totalInterest],
      ['', ''],
      ['Additional Costs (Tamil Nadu)', ''],
      ['Processing Fees (0.5%)', result.processingFees],
      ['Insurance Premium (0.3%)', result.insurance],
      ['Registration Charges (0.7%)', result.registrationCharges],
      ['Total Upfront Cost', result.totalUpfrontCost],
      ['', ''],
      ['Financial Summary', ''],
      ['Principal Amount', result.principalAmount],
      [`Total Interest Over ${tenure[0]} Years`, result.totalInterest],
      ['Total Amount (Principal + Interest)', result.totalAmount],
      ['Additional Upfront Costs', result.totalUpfrontCost],
      ['Grand Total Cost', result.totalAmount + result.totalUpfrontCost],
      ['', ''],
      ['Generated on', new Date().toLocaleDateString('en-IN', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })],
      ['', ''],
      ['Note', 'This is an indicative calculation. Actual EMI may vary based on bank policies and processing fees.']
    ];

    // Create worksheet
    const ws = XLSX.utils.aoa_to_sheet(data);
    
    // Style the header
    ws['A1'] = { t: 's', v: 'EMI CALCULATION REPORT', s: { font: { bold: true, sz: 16 } } };
    
    // Set column widths
    ws['!cols'] = [
      { width: 35 },
      { width: 20 }
    ];
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'EMI Calculation');
    
    // Generate filename
    const filename = `EMI-Calculation-${formatLakhs(result.principalAmount).replace('₹', '').replace(' ', '')}-${new Date().getTime()}.xlsx`;
    
    // Save the file
    XLSX.writeFile(wb, filename);
    
    toast({
      title: "Download Complete!",
      description: "EMI calculation report has been saved as Excel file.",
    });
  };

  const saveCalculation = async (data: SaveCalculationData) => {
    try {
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "emiCalculator",
          data: {
            ...data,
            calculation: {
              loanAmount: loanAmount[0],
              interestRate: interestRate[0],
              tenure: tenure[0],
              emi: result?.emi,
              totalAmount: result?.totalAmount,
              totalInterest: result?.totalInterest,
            },
          },
        }),
      });
      
      toast({
        title: "Calculation Saved!",
        description: "Our team will contact you soon with personalized loan options.",
      });
      
      form.reset();
      setShowSaveForm(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save calculation. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className={`w-full max-w-full ${className}`}>
      <CardHeader className="text-center p-3 xs:p-4 sm:p-6">
        <CardTitle className="flex items-center justify-center text-lg xs:text-xl sm:text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
          <Calculator className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 mr-2 text-[#b48b2f]" />
          EMI Calculator
        </CardTitle>
        <p className="text-xs xs:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
          Calculate your home loan EMI instantly
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 xs:space-y-5 sm:space-y-6 p-3 xs:p-4 sm:p-6">
        {/* Loan Amount */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
              Loan Amount
            </Label>
            <span className="text-[#b48b2f] font-semibold [font-family:'Poppins',Helvetica]">
              {formatLakhs(loanAmount[0])}
            </span>
          </div>
          <Slider
            value={loanAmount}
            onValueChange={setLoanAmount}
            max={10000000}
            min={1000000}
            step={100000}
            className="[&_.bg-primary]:bg-[#b48b2f]"
          />
          <div className="flex justify-between text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
            <span>₹10L</span>
            <span>₹1Cr</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
              Interest Rate
            </Label>
            <span className="text-[#b48b2f] font-semibold [font-family:'Poppins',Helvetica]">
              {interestRate[0]}% p.a.
            </span>
          </div>
          <Slider
            value={interestRate}
            onValueChange={setInterestRate}
            max={12}
            min={8.5}
            step={0.1}
            className="[&_.bg-primary]:bg-[#b48b2f]"
          />
          <div className="flex justify-between text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
            <span>8.5%</span>
            <span>12%</span>
          </div>
        </div>

        {/* Loan Tenure */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
              Loan Tenure
            </Label>
            <span className="text-[#b48b2f] font-semibold [font-family:'Poppins',Helvetica]">
              {tenure[0]} years
            </span>
          </div>
          <Slider
            value={tenure}
            onValueChange={setTenure}
            max={30}
            min={5}
            step={1}
            className="[&_.bg-primary]:bg-[#b48b2f]"
          />
          <div className="flex justify-between text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
            <span>5 years</span>
            <span>30 years</span>
          </div>
        </div>

        {/* Results */}
        {result && (
          <div className="bg-gradient-to-r from-[#b48b2f]/10 to-[#b48b2f]/5 rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica] text-center mb-4">
              EMI Calculation Results
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#b48b2f] [font-family:'Poppins',Helvetica]">
                  {formatLakhs(result.emi)}
                </div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                  Monthly EMI
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
                  {formatLakhs(result.totalAmount)}
                </div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                  Total Amount
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica]">
                  {formatLakhs(result.principalAmount)}
                </div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                  Principal Amount
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-lg font-semibold text-[#313131] [font-family:'Poppins',Helvetica]">
                  {formatLakhs(result.totalInterest)}
                </div>
                <div className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
                  Total Interest
                </div>
              </div>
            </div>

            {/* Additional Costs for Tamil Nadu */}
            <div className="border-t pt-4">
              <h4 className="text-sm font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-3">
                Additional Costs (Tamil Nadu)
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Processing Fees (0.5%)</span>
                  <span className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
                    {formatCurrency(result.processingFees)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Insurance (0.3%)</span>
                  <span className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
                    {formatCurrency(result.insurance)}
                  </span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">Registration Charges (0.7%)</span>
                  <span className="text-[#313131] [font-family:'Poppins',Helvetica] font-medium">
                    {formatCurrency(result.registrationCharges)}
                  </span>
                </div>
                <div className="flex justify-between col-span-2 pt-2 border-t">
                  <span className="text-[#b48b2f] [font-family:'Poppins',Helvetica] font-semibold">Total Upfront Cost</span>
                  <span className="text-[#b48b2f] [font-family:'Poppins',Helvetica] font-bold">
                    {formatLakhs(result.totalUpfrontCost)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white [font-family:'Poppins',Helvetica]"
                onClick={() => setShowSaveForm(!showSaveForm)}
              >
                <Save className="w-4 h-4 mr-2" />
                Save & Contact
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-[#b48b2f] text-[#b48b2f] hover:bg-[#b48b2f] hover:text-white [font-family:'Poppins',Helvetica]"
                onClick={downloadCalculation}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>

            {/* Save Form */}
            {showSaveForm && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-[#313131] [font-family:'Poppins',Helvetica] mb-4">
                  Get Personalized Loan Options
                </h4>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(saveCalculation)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                            Name *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              {...field}
                              className="[font-family:'Poppins',Helvetica]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                            Phone *
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your phone number"
                              {...field}
                              className="[font-family:'Poppins',Helvetica]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                            Email (Optional)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your email address"
                              type="email"
                              {...field}
                              className="[font-family:'Poppins',Helvetica]"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <Button
                        type="submit"
                        className="flex-1 bg-[#b48b2f] hover:bg-[#9d7829] text-white [font-family:'Poppins',Helvetica]"
                      >
                        Save & Get Options
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowSaveForm(false)}
                        className="flex-1 [font-family:'Poppins',Helvetica]"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
          </div>
        )}

        <div className="text-xs text-[#6b6b6b] [font-family:'Poppins',Helvetica] text-center">
          * This is an indicative calculation. Actual EMI may vary based on bank policies and processing fees.
        </div>
      </CardContent>
    </Card>
  );
};