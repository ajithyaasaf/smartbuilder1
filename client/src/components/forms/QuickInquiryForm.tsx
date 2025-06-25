import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quickInquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  projectType: z.string().min(1, "Please select a project type"),
});

type QuickInquiryData = z.infer<typeof quickInquirySchema>;

interface QuickInquiryFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: "inline" | "modal";
}

export const QuickInquiryForm: React.FC<QuickInquiryFormProps> = ({
  title = "Quick Inquiry",
  subtitle = "Get instant callback from our experts",
  className = "",
  variant = "inline",
}) => {
  const { toast } = useToast();
  
  const form = useForm<QuickInquiryData>({
    resolver: zodResolver(quickInquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      projectType: "",
    },
  });

  const onSubmit = async (data: QuickInquiryData) => {
    try {
      // Validate data before submission
      const validatedData = quickInquirySchema.parse(data);
      
      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "quickInquiry",
          data: validatedData,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      toast({
        title: "Inquiry Submitted!",
        description: "We'll call you back within 30 minutes.",
      });
      
      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      
      // Check if it's a validation error
      if (error instanceof z.ZodError) {
        toast({
          title: "Validation Error",
          description: "Please check all required fields and try again.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                Phone Number *
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+91 98765 43210"
                  {...field}
                  className="[font-family:'Poppins',Helvetica]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="projectType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                Interested In *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="[font-family:'Poppins',Helvetica]">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="apartments">Apartments</SelectItem>
                  <SelectItem value="villas">Villas</SelectItem>
                  <SelectItem value="mini-apartments">Mini Apartments</SelectItem>
                  <SelectItem value="land">Land Development</SelectItem>
                  <SelectItem value="consultation">Free Consultation</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white font-medium [font-family:'Poppins',Helvetica] rounded-[20px_2px_20px_2px] py-3 h-auto disabled:opacity-50"
        >
          {form.formState.isSubmitting ? (
            "Processing..."
          ) : (
            <>
              <Phone className="w-4 h-4 mr-2" />
              Request Callback
            </>
          )}
        </Button>
      </form>
    </Form>
  );

  if (variant === "modal") {
    return formContent;
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
          {title}
        </h3>
        <p className="text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
          {subtitle}
        </p>
      </div>
      {formContent}
    </div>
  );
};