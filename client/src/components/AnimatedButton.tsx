import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends ButtonProps {
  animationType?: "hover" | "pulse" | "slide" | "bounce";
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  className,
  animationType = "hover",
  ...props
}) => {
  const animationClasses = {
    hover: "animate-button transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:shadow-lg",
    pulse: "animate-pulse",
    slide: "transition-transform hover:translate-x-1",
    bounce: "hover:animate-bounce"
  };

  return (
    <Button
      className={cn(
        animationClasses[animationType],
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
};