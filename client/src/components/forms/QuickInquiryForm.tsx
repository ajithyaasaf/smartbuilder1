import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SimpleSelect as Select, SimpleSelectContent as SelectContent, SimpleSelectItem as SelectItem, SimpleSelectTrigger as SelectTrigger, SimpleSelectValue as SelectValue } from "@/components/ui/simple-select";
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

  // Prevent GSAP from interfering with form elements
  useEffect(() => {
    const formElement = document.querySelector(`[data-form-id="quick-inquiry"]`);
    if (formElement) {
      // Mark this form as animation-safe
      formElement.setAttribute('data-animation-ready', 'true');
    }

    // Add global error handler for this component
    const handleError = (event: ErrorEvent) => {
      if (event.message && event.message.includes('ResizeObserver')) {
        event.preventDefault();
        return true;
      }
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);
  
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
        description: "We'll call you back soon.",
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
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4"
        data-form-id="quick-inquiry"
      >
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
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  value={field.value || ""} 
                  placeholder="Select option"
                  className="[font-family:'Poppins',Helvetica]"
                >
                  <SelectItem value="apartments">Apartments</SelectItem>
                  <SelectItem value="villas">Villas</SelectItem>
                  <SelectItem value="mini-apartments">Mini Apartments</SelectItem>
                  <SelectItem value="land">Land Development</SelectItem>
                  <SelectItem value="consultation">Free Consultation</SelectItem>
                </Select>
              </FormControl>
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
    <div className={`bg-white rounded-lg shadow-lg p-3 xs:p-4 sm:p-6 w-full max-w-full ${className}`}>
      <div className="text-center mb-4 sm:mb-6">
        <h3 className="text-lg xs:text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica] mb-2">
          {title}
        </h3>
        <p className="text-xs xs:text-sm text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
          {subtitle}
        </p>
      </div>
      {formContent}
    </div>
  );
};