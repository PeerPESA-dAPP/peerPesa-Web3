
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Currency {
  code: string;
  name: string;
  flag?: string;
  isCrypto?: boolean;
  logo?: string;
}

interface CurrencySelectProps {
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
  label?: string;
}

export const CurrencySelect: React.FC<CurrencySelectProps> = ({
  value,
  onChange,
  currencies,
  label,
}) => {
  return (
    <div className="w-full">
      {label && <div className="text-sm mb-2 text-gray-500">{label}</div>}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-black text-white rounded-xl border-none h-[52px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {currencies.map((currency) => (
            <SelectItem
              key={currency.code}
              value={currency.code}
              className="flex items-center py-2 cursor-pointer hover:bg-gray-50 text-sm"
            >
              <div className="flex items-center w-full">
                {currency.logo ? (
                  <Avatar className="h-5 w-5 mr-3">
                    <AvatarImage 
                      src={currency.logo} 
                      alt={`${currency.code} logo`}
                      className="rounded-full object-cover" 
                    />
                    <AvatarFallback className="text-xs">
                      {currency.code.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                ) : currency.flag ? (
                  <span className="inline-block w-5 h-5 text-xl leading-5 text-center mr-3">
                    {currency.flag}
                  </span>
                ) : null}
                <span className="font-medium">{currency.code}</span>
                {currency.name && (
                  <span className="text-gray-500 text-xs ml-2">
                    ({currency.code === "ZAR" ? "SouthAfrican" : currency.name.split(' ')[0]})
                  </span>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
