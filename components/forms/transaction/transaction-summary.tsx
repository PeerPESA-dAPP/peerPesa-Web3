
import React from "react";
import { TransactionSummaryItem } from "@/types";

interface TransactionSummaryProps {
  details: TransactionSummaryItem[];
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({ details }) => {
  return (
    <div className="flex flex-col space-y-3 w-full bg-white">
      {details.map((detail, index) => (
        <div 
          key={index} 
          className={`flex justify-between items-center bg-white ${detail.isTotal ? "pt-3 border-t border-gray-200" : ""}`}
        >
          <span className={`text-sm text-black ${detail.isTotal ? "font-semibold" : "text-gray-700"}`}>
            {detail.label}
          </span>
          <span className={`text-black ${detail.isTotal ? "font-semibold" : ""}`}>
            {detail.value}
          </span>
        </div>
      ))}
    </div>
  );
};

