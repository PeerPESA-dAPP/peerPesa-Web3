import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


interface NetworkSelectProps {
  value: string;
  onChange: (value: string) => void;
  networks: any[];
  label?: string;
  className?: string;
}

export const NetworkSelect: React.FC<NetworkSelectProps> = ({
  value,
  onChange,
  networks,
  label = "Network",
  className
}) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-500">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className={`w-full border border-peerpesa-primary bg-background px-4 py-3 text-base ring-offset-background focus:outline-none focus:ring-2 focus:ring-peerpesa-primary focus:ring-offset-2 ${className}`}>
          <SelectValue placeholder="Select network" />
        </SelectTrigger>
        <SelectContent>
          {networks.map((network) => (
            <SelectItem key={network?.code} value={network?.id}>
              {network?.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}; 