
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TransactionSummary } from "./transaction-summary";
import { TransactionSummaryItem } from "@/types";
import { Separator } from "@/components/ui/separator";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  details: TransactionSummaryItem[];
  paymentDetails?: Record<string, string>;
  paymentMethod?: string;
  confirmText?: string;
  cancelText?: string;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
  details,
  paymentDetails = {},
  paymentMethod = "",
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  const renderPaymentDetails = () => {
    if (!paymentMethod || Object.keys(paymentDetails).length === 0) return null;
    
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Payment Details</h3>
        <div className="bg-gray-50 p-3 rounded-md">
          <div className="text-sm mb-1 text-gray-600">
            <span className="font-medium">Method: </span>
            {paymentMethod === "bank-transfer" ? "Bank Transfer" : 
             paymentMethod === "mobile-money" ? "Mobile Money" : 
             paymentMethod === "credit-card" ? "Credit/Debit Card" : paymentMethod}
          </div>
          
          {Object.entries(paymentDetails).map(([key, value]) => {
            if (!value) return null;
            
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
      </div>
    );
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <AlertDialogContent className="max-w-md bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-black">{title}</AlertDialogTitle>
          {description && <AlertDialogDescription className="text-gray-700">{description}</AlertDialogDescription>}
        </AlertDialogHeader>
        
        <div className="py-4 bg-white">
          <TransactionSummary details={details} />
          {renderPaymentDetails()}
        </div>
        
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black border-gray-300 hover:bg-gray-100">
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            className="bg-peerpesa-primary text-white hover:bg-peerpesa-primary-dark"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
