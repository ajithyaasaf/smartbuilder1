import React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SimpleSelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  children: React.ReactNode;
  className?: string;
}

interface SimpleSelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const SimpleSelect: React.FC<SimpleSelectProps> = ({
  value,
  onValueChange,
  placeholder,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");

  React.useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const handleSelect = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  // Extract options from children
  const options = React.Children.toArray(children).map((child) => {
    if (React.isValidElement(child) && child.type === SimpleSelectItem) {
      return {
        value: child.props.value,
        label: child.props.children,
      };
    }
    return null;
  }).filter(Boolean);

  const selectedOption = options.find(opt => opt?.value === selectedValue);
  const displayText = selectedOption?.label || placeholder || "Select option";

  return (
    <div className="relative">
      <button
        type="button"
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setTimeout(() => setIsOpen(false), 150)}
      >
        <span className={cn(selectedValue ? "text-foreground" : "text-muted-foreground")}>
          {displayText}
        </span>
        <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md">
          <div className="p-1">
            {options.map((option) => (
              <button
                key={option?.value}
                type="button"
                className={cn(
                  "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                  selectedValue === option?.value && "bg-accent text-accent-foreground"
                )}
                onClick={() => handleSelect(option?.value || "")}
              >
                {option?.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const SimpleSelectItem: React.FC<SimpleSelectItemProps> = ({ value, children }) => {
  // This is a placeholder component for defining options
  return null;
};

export const SimpleSelectTrigger = ({ children, className }: { children: React.ReactNode; className?: string }) => children;
export const SimpleSelectValue = ({ placeholder }: { placeholder?: string }) => null;
export const SimpleSelectContent = ({ children }: { children: React.ReactNode }) => children;