import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { useToast } from "@/hooks/use-toast";

interface ReceiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  address: string;
  symbol: string;
}

export const ReceiveModal: React.FC<ReceiveModalProps> = ({
  isOpen,
  onClose,
  address,
  symbol
}) => {
  const { toast } = useToast();

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    toast({
      description: "Address copied to clipboard",
      duration: 2000,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive {symbol}</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeCanvas 
              value={address}
              size={200}
              level="H"
              includeMargin={true}
            />
          </div>
          
          <div className="w-full space-y-2">
            <p className="text-sm text-muted-foreground text-center">Deposit Address</p>
            <div className="flex items-center gap-2 bg-muted p-3 rounded-md">
              <code className="text-sm break-all flex-1">{address}</code>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={handleCopyAddress}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="text-sm text-muted-foreground text-center space-y-2">
            <p>Only send {symbol} to this address</p>
            <p>Sending any other asset may result in permanent loss</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}; 