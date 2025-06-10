
import React from "react";
import { TransactionSummaryItem } from "@/types";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface TransactionReceiptProps {
  details: TransactionSummaryItem[];
  transactionId: string;
  recipient?: string;
  paymentDetails?: Record<string, string>;
  paymentMethod?: string;
}

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({
  details,
  transactionId,
  recipient,
  paymentDetails = {},
  paymentMethod = "",
}) => {
  return (
    <div className="bg-white p-4 rounded-lg">
      <div className="text-center mb-6">
        <h2 className="font-bold text-lg">PeerPesa</h2>
        <div className="text-xs text-gray-500">
          Transaction Receipt
        </div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500">Date & Time</div>
        <div className="text-sm">{format(new Date(), "PPpp")}</div>
      </div>
      
      <div className="mb-4">
        <div className="text-xs text-gray-500">Transaction ID</div>
        <div className="text-sm font-mono">{transactionId}</div>
      </div>
      
      {recipient && (
        <div className="mb-4">
          <div className="text-xs text-gray-500">Recipient Wallet</div>
          <div className="text-sm font-mono break-all">{recipient}</div>
        </div>
      )}
      
      <Separator className="my-4" />
      
      {details.map((item, index) => (
        <div 
          key={index} 
          className={`flex justify-between py-1 ${item.isTotal ? 'font-bold' : ''}`}
        >
          <div className="text-sm">{item.label}</div>
          <div className="text-sm">{item.value}</div>
        </div>
      ))}
      
      {paymentMethod && Object.keys(paymentDetails).length > 0 && (
        <>
          <Separator className="my-4" />
          <div className="mb-2 text-sm font-medium">Payment Details</div>
          
          <div className="flex justify-between py-1">
            <div className="text-sm">Method</div>
            <div className="text-sm">
              {paymentMethod === "bank-transfer" ? "Bank Transfer" : 
               paymentMethod === "mobile-money" ? "Mobile Money" : 
               paymentMethod === "credit-card" ? "Credit/Debit Card" : paymentMethod}
            </div>
          </div>
          
          {Object.entries(paymentDetails).map(([key, value]) => {
            if (!value || key === "walletAddress") return null;
            
            // Format the key for display
            const formattedKey = key
              .replace(/([A-Z])/g, ' $1')
              .replace(/^./, str => str.toUpperCase());
            
            return (
              <div key={key} className="flex justify-between py-1">
                <div className="text-sm">{formattedKey}</div>
                <div className="text-sm">{value}</div>
              </div>
            );
          })}
        </>
      )}
      
      <Separator className="my-4" />
      
      <div className="text-center text-xs text-gray-500 mt-4">
        Thank you for using PeerPesa!
      </div>
    </div>
  );
};
