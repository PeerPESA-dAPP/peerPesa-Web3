
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TransactionReceipt } from "./transaction-receipt";
import { TransactionSummaryItem } from "@/types";
import html2canvas from "html2canvas";

interface ReceiptDialogProps {
  open: boolean;
  onClose: () => void;
  details: TransactionSummaryItem[];
  title: string;
  transactionId: string;
  recipient?: string;
  paymentDetails?: Record<string, string>;
  paymentMethod?: string;
}

export const ReceiptDialog: React.FC<ReceiptDialogProps> = ({
  open,
  onClose,
  details,
  title,
  transactionId,
  recipient,
  paymentDetails = {},
  paymentMethod = "",
}) => {
  const receiptRef = React.useRef<HTMLDivElement>(null);

  const downloadReceipt = async () => {
    if (!receiptRef.current) return;

    try {
      const canvas = await html2canvas(receiptRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      
      const link = document.createElement("a");
      link.download = `receipt-${transactionId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to download receipt:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) onClose();
    }}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div ref={receiptRef} className="bg-white p-2">
          <TransactionReceipt
            details={details}
            transactionId={transactionId}
            recipient={recipient}
            paymentDetails={paymentDetails}
            paymentMethod={paymentMethod}
          />
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={downloadReceipt}>Download</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
