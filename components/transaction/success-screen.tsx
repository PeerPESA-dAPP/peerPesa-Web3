
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ReceiptDialog } from "./receipt-dialog";
import { TransactionSummaryItem } from "@/types";

interface SuccessScreenProps {
  title: string;
  message: string;
  details: TransactionSummaryItem[];
  transactionId?: string;
  backToPath?: string;
  backButtonText?: string;
  onBackClick?: () => void;
  recipient?: string;
  paymentDetails?: Record<string, string>;
  paymentMethod?: string;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  title,
  message,
  details,
  transactionId,
  backToPath = "/",
  backButtonText = "Back",
  onBackClick,
  recipient,
  paymentDetails = {},
  paymentMethod = "",
}) => {
  const [showReceipt, setShowReceipt] = React.useState(false);

  return (
    <>
      <Card className="bg-white rounded-lg shadow-sm overflow-hidden text-center p-6">
        <div className="mb-6">
          <div className="bg-green-100 rounded-full h-16 w-16 flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-6">{message}</p>

        {recipient && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
            <p className="text-sm text-gray-500 mb-1">Wallet Address</p>
            <p className="font-mono text-sm break-all">{recipient}</p>
          </div>
        )}

        {paymentMethod && Object.keys(paymentDetails).length > 0 && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 text-left">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Details</h3>
            <div className="text-sm mb-1 text-gray-600">
              <span className="font-medium">Method: </span>
              {paymentMethod === "bank-transfer" ? "Bank Transfer" : 
               paymentMethod === "mobile-money" ? "Mobile Money" : 
               paymentMethod === "credit-card" ? "Credit/Debit Card" : paymentMethod}
            </div>
            
            {Object.entries(paymentDetails).map(([key, value]) => {
              if (!value || key === "walletAddress") return null;
              
              // Format the key for display
              const formattedKey = key
                .replace(/([A-Z])/g, ' $1')
                .replace(/^./, str => str.toUpperCase());
              
              return (
                <div key={key} className="text-sm mb-1 text-gray-600">
                  <span className="font-medium">{formattedKey}: </span>
                  {value}
                </div>
              );
            })}
          </div>
        )}

        {transactionId && (
          <div className="text-xs text-gray-500 mb-6">
            Transaction ID: {transactionId}
          </div>
        )}

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowReceipt(true)}
          >
            View Receipt
          </Button>

          <Link to={backToPath} className="block">
            <Button 
              variant="default"
              className="w-full"
              onClick={onBackClick}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> {backButtonText}
            </Button>
          </Link>
        </div>
      </Card>

      <ReceiptDialog
        open={showReceipt}
        onClose={() => setShowReceipt(false)}
        details={details}
        transactionId={transactionId || ""}
        title="Payment Receipt"
        recipient={recipient}
        paymentDetails={paymentDetails}
        paymentMethod={paymentMethod}
      />
    </>
  );
};
