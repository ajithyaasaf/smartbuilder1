import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Mail, Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required").optional().or(z.literal("")),
});

type NewsletterData = z.infer<typeof newsletterSchema>;

interface NewsletterFormProps {
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: "inline" | "card";
}

export const NewsletterForm: React.FC<NewsletterFormProps> = ({
  title = "Stay Updated",
  subtitle = "Get latest property updates and exclusive offers",
  className = "",
  variant = "card"
}) => {
  const { toast } = useToast();
  
  const form = useForm<NewsletterData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: "",
      name: "",
    },
  });

  const onSubmit = async (data: NewsletterData) => {
    try {
      await fetch("/api/forms/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formType: "newsletter",
          data: data,
        }),
      });
      
      toast({
        title: "Subscribed Successfully!",
        description: "You'll receive our latest updates and exclusive offers.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    }
  };

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {variant === "card" && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                  Name (Optional)
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
        )}
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#313131] [font-family:'Poppins',Helvetica]">
                Email Address *
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  {...field}
                  className="[font-family:'Poppins',Helvetica]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-[#b48b2f] hover:bg-[#9d7829] text-white rounded-[40px_5px_40px_5px] py-3 font-medium [font-family:'Poppins',Helvetica]"
          disabled={form.formState.isSubmitting}
        >
          <Send className="w-4 h-4 mr-2" />
          {form.formState.isSubmitting ? "Subscribing..." : "Subscribe Now"}
        </Button>
      </form>
    </Form>
  );

  if (variant === "inline") {
    return (
      <div className={className}>
        {formContent}
      </div>
    );
  }

  return (
    <Card className={`border-none shadow-lg ${className}`}>
      <CardHeader className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 bg-[#b48b2f] rounded-full flex items-center justify-center">
          <Mail className="w-6 h-6 text-white" />
        </div>
        <CardTitle className="text-xl font-bold text-[#313131] [font-family:'Poppins',Helvetica]">
          {title}
        </CardTitle>
        <p className="text-[#6b6b6b] [font-family:'Poppins',Helvetica]">
          {subtitle}
        </p>
      </CardHeader>
      <CardContent>
        {formContent}
      </CardContent>
    </Card>
  );
};