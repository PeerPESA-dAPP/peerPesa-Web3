
import React from "react";
import { Input } from "@/components/ui/input";

interface AmountInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  hideLabel?: boolean;
}

export const AmountInput: React.FC<AmountInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "0",
  readOnly = false,
  hideLabel = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    
    // Only allow numeric input with a single decimal point
    if (inputValue === "" || /^[0-9]*\.?[0-9]*$/.test(inputValue)) {
      onChange(inputValue);
    }
  };

  return (
    <div className="w-full">
      {label && !hideLabel && <div className="text-sm mb-2 text-gray-500">{label}</div>}
      <Input
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        readOnly={readOnly}
        className={`text-xl ${readOnly ? "bg-gray-50" : ""}`}
      />
    </div>
  );
};
