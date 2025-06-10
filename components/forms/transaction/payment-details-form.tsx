import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Phone, ChevronRight, FileCheck, CheckCircle2 } from "lucide-react";
import { TransactionSummary } from "./transaction-summary";
import { Label } from "@/components/ui/label";

interface PaymentDetailsFormProps {
  onBack: () => void;
  onNext: () => void;
  paymentMethod: string;
  amount: string;
  currency: string;
  onCurrencyChange: (currency: string) => void;
  onWalletAddressChange?: (address: string) => void;
  onPaymentDetailsChange?: (details: Record<string, string>) => void;
}

export const PaymentDetailsForm: React.FC<PaymentDetailsFormProps> = ({
  onBack,
  onNext,
  paymentMethod,
  amount,
  currency,
  onCurrencyChange,
  onWalletAddressChange,
  onPaymentDetailsChange,
}) => {
  // Form state
  
  // Credit card state
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Mobile money state
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileMoneyName, setMobileMoneyName] = useState("");
  const [reason, setReason] = useState("");
  const [country, setCountry] = useState("");
  
  // Wallet address state
  const [walletAddress, setWalletAddress] = useState("");

  // Update payment details whenever relevant fields change
  useEffect(() => {
    if (onPaymentDetailsChange) {
      let details: Record<string, string> = { name, email };
      
      if (paymentMethod === "credit-card") {
        // Mask the card number for security
        const maskedCardNumber = cardNumber.replace(/\d(?=\d{4})/g, "•");
        details = {
          ...details,
          cardNumber: maskedCardNumber,
          expiryDate,
        };
      } else if (paymentMethod === "mobile-money") {
        details = {
          ...details,
          mobileNumber,
          mobileMoneyName,
          reason,
          country
        };
      }
      
      // Add wallet address to details
      if (walletAddress) {
        details.walletAddress = walletAddress;
      }
      
      onPaymentDetailsChange(details);
    }
  }, [
    paymentMethod, name, email, cardNumber, expiryDate, cvv,
    mobileNumber, mobileMoneyName, reason,
    country, walletAddress, onPaymentDetailsChange
  ]);

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = [];

    for (let i = 0; i < cleaned.length; i += 4) {
      chunks.push(cleaned.slice(i, i + 4));
    }

    return chunks.join(" ");
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, "");
    
    if (cleaned.length > 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    
    return cleaned;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    setCardNumber(formattedValue.slice(0, 19)); // 16 digits + 3 spaces
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue.slice(0, 5)); // MM/YY
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cleaned = e.target.value.replace(/\D/g, "");
    setCvv(cleaned.slice(0, 3));
  };

  const handleWalletChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWalletAddress(value);
    if (onWalletAddressChange) {
      onWalletAddressChange(value);
    }
  };

  const isFormValid = () => {
    if (paymentMethod === "credit-card") {
      return cardNumber.replace(/\s/g, "").length === 16 && 
        expiryDate.length === 5 && 
        cvv.length === 3 && 
        name && 
        email &&
        walletAddress;
    } else if (paymentMethod === "mobile-money") {
      return mobileNumber && mobileMoneyName && email && walletAddress;
    }
    
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext();
  };

  // Helper function to get payment method icon
  const getPaymentMethodIcon = () => {
    switch (paymentMethod) {
      case "credit-card":
        return <CreditCard className="h-5 w-5 text-purple-600" />;
      case "mobile-money":
        return <Phone className="h-5 w-5 text-green-600" />;
      default:
        return <CreditCard className="h-5 w-5" />;
    }
  };

  // Helper function to get title based on payment method
  const getPaymentMethodTitle = () => {
    switch (paymentMethod) {
      case "credit-card":
        return "Credit/Debit Card Payment";
      case "mobile-money":
        return "Mobile Money";
      default:
        return "Payment Details";
    }
  };

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
      <form onSubmit={handleSubmit} className="p-6">
        
        <div className="flex items-center mb-6">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="p-0 mr-2 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            {getPaymentMethodIcon()}
            <h2 className="text-xl font-semibold ml-2">{getPaymentMethodTitle()}</h2>
          </div>
        </div>

        {/* Common information for all payment methods */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <FileCheck className="h-4 w-4 mr-2 text-peerpesa-primary" />
            Contact Information
          </h3>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Full Name</label>
            <Input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="border-gray-300 focus-visible:ring-peerpesa-primary hover:border-peerpesa-primary/50 transition-colors"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              type="email"
              className="border-gray-300 focus-visible:ring-peerpesa-primary hover:border-peerpesa-primary/50 transition-colors"
            />
          </div>
        </div>
        
        {/* Payment method specific fields */}
        {paymentMethod === "credit-card" && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-purple-600" />
              Card Information
            </h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Card Number</label>
              <Input 
                value={cardNumber}
                onChange={handleCardNumberChange}
                placeholder="0000 0000 0000 0000"
                className="border-gray-300 focus-visible:ring-purple-600 hover:border-purple-300 transition-colors font-mono"
              />
            </div>
            
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-sm text-gray-600 mb-1">Expiry Date</label>
                <Input 
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  placeholder="MM/YY"
                  className="border-gray-300 focus-visible:ring-purple-600 hover:border-purple-300 transition-colors"
                />
              </div>
              <div className="w-24">
                <label className="block text-sm text-gray-600 mb-1">CVV</label>
                <Input 
                  value={cvv}
                  onChange={handleCvvChange}
                  placeholder="123"
                  className="border-gray-300 focus-visible:ring-purple-600 hover:border-purple-300 transition-colors"
                  type="password"
                />
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "mobile-money" && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
              <Phone className="h-4 w-4 mr-2 text-green-600" />
              Mobile Money Details
            </h3>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Mobile Number</label>
              <Input
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="Enter mobile number"
                className="border-gray-300 focus-visible:ring-green-600 hover:border-green-300 transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Mobile Money Name</label>
              <Input
                value={mobileMoneyName}
                onChange={(e) => setMobileMoneyName(e.target.value)}
                placeholder="Enter account name for mobile money"
                className="border-gray-300 focus-visible:ring-green-600 hover:border-green-300 transition-colors"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Reason for Payment</label>
              <Input
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Reason for payment"
                className="border-gray-300 focus-visible:ring-green-600 hover:border-green-300 transition-colors"
              />
            </div>
          </div>
        )}
        
        {/* Wallet Information Section */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
            <CreditCard className="h-4 w-4 mr-2 text-amber-600" />
            Wallet Information
          </h3>
          <div className="mb-4">
            <label className="block text-sm text-gray-600 mb-1">Your Wallet Address</label>
            <Input 
              value={walletAddress}
              onChange={handleWalletChange}
              placeholder="0x1234...5678"
              className="border-gray-300 font-mono text-sm focus-visible:ring-amber-600 hover:border-amber-300 transition-colors"
            />
          </div>
        </div>
        
        {/* Transaction Summary */}
        <div className="bg-gray-50 -mx-6 px-6 py-4 mb-6 border-t border-b border-gray-200">
          <TransactionSummary details={[
            { label: "Amount", value: `${amount} ${currency}` },
            { label: "Fee", value: `${(Number(amount) * 0.015).toFixed(2)} ${currency}` },
            { label: "Total", value: `${(Number(amount) * 1.015).toFixed(2)} ${currency}`, isTotal: true },
          ]} />
        </div>
        
        {/* Continue Button */}
        <Button
          type="submit"
          disabled={!isFormValid()}
          className="w-full bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white py-4 hover:scale-[1.01] transition-transform"
        >
          <CreditCard className="h-4 w-4 mr-2" /> Continue to Review
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </form>
    </Card>
  );
};
