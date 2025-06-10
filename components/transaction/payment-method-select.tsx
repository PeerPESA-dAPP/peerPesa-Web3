import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Phone } from "lucide-react";

interface PaymentMethod {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface PaymentMethodSelectProps {
  value: string;
  onChange: (value: string) => void;
  methods?: readonly PaymentMethod[];
  label?: string;
}

export const PaymentMethodSelect: React.FC<PaymentMethodSelectProps> = ({
  value,
  onChange,
  label = "Mode of payment",
  methods = [
    { 
      id: "mobile-money", 
      name: "Mobile Money",
      icon: <Phone className="h-4 w-4 text-green-600" />
    },
    { 
      id: "credit-card", 
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-4 w-4 text-purple-600" />
    },
  ]
}) => {
  // Helper function to get the icon based on method ID if icon is not provided
  const getMethodIcon = (methodId: string) => {
    if (methodId === "mobile-money") return <Phone className="h-4 w-4 text-green-600" />;
    return <CreditCard className="h-4 w-4 text-purple-600" />;
  };

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-white border border-gray-200 rounded-xl h-[52px] hover:border-peerpesa-primary transition-colors">
          <SelectValue placeholder="Select payment method" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-100 shadow-lg rounded-lg min-w-[200px]">
          {methods.map((method) => (
            <SelectItem
              key={method.id}
              value={method.id}
              className="py-3 px-4 cursor-pointer 
                         hover:bg-gray-100 hover:text-peerpesa-primary transition-colors 
                         active:bg-gray-700 active:text-white
                         focus:bg-gray-700 focus:text-white
                         flex items-center space-x-3 
                         data-[state=checked]:bg-gray-700 data-[state=checked]:text-white
                         [&>span:first-child]:mr-4 [&>span:first-child]:flex [&>span:first-child]:items-center"
            >
              <div className="flex items-center">
                {method.icon || getMethodIcon(method.id)}
                <span className="ml-2">{method.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
