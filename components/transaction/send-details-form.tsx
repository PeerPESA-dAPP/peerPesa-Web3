import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CurrencySelect } from "@/components/transaction/currency-select";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { NetworkSelect } from "./network-select";
import { GET_CRYPTO_FEES } from "@/utils/constants";
import { useWithdraw } from "@/hooks/useWithdraw";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { Currency } from "@/types";

interface PaymentDetails {
  accountNumber?: string;
  accountName?: string;
  branch?: string;
  swiftCode?: string;
  country?: string;
  mobileNumber?: string;
  mobileMoneyName?: string;
  mobileNetwork?: string;
  reason?: string;
  network?: string;
}

interface ValidatedAccountDetails {
  accountNumber?: string;
  accountName?: string;
}

interface SendDetailsFormProps {
  paymentMethod: string;
  cryptoCurrency?: string;
  setCryptoCurrency?: (value: string) => void;
  amount?: string;
  setAmount?: (value: string) => void;
  onBack?: () => void;
  onNext?: (paymentDetails: {
    accountNumber?: string;
    accountName?: string;
    branch?: string;
    swiftCode?: string;
    country?: string;
    mobileNumber?: string;
    mobileMoneyName?: string;
    mobileNetwork?: string;
    reason?: string;
  }) => void;
  selectedCurrency?: {
    code: string;
    name: string;
    isCrypto: boolean;
  };
  fiatCurrency?: string;
  setFiatCurrency?: (value: string) => void;
}

export const SendDetailsForm = ({
  paymentMethod,
  cryptoCurrency,
  setCryptoCurrency,
  amount,
  setAmount,
  onBack,
  onNext,
  selectedCurrency,
  fiatCurrency,
  setFiatCurrency
}: SendDetailsFormProps) => {
  // Form state
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [branch, setBranch] = useState("");
  const [swiftCode, setSwiftCode] = useState("");
  const [country, setCountry] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [mobileMoneyName, setMobileMoneyName] = useState("");
  const [mobileNetwork, setMobileNetwork] = useState("");
  const [reason, setReason] = useState("");
  const [formData, setFormData] = useState<PaymentDetails>({});
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const { fetchWithdrawNetworks, networks, validateReceiveAccount } = useWithdraw();
  const [validateAccountNumber, setValidateAccountNumber] = useState(false);

  const [validatedAccDetails, setValidatedAccDetails] = useState<ValidatedAccountDetails>({});
  const { toast } = useToast();

  // Fiat currencies to show in the dropdown
  const fiatCurrencies: Currency[] = [
    { 
      code: "ZAR", 
      name: "South African Rand", 
      flag: undefined,
      logo: "/lovable-uploads/07b76ca7-e77b-4939-8e77-a6dacceeba1b.png"
    },
    { 
      code: "UGX", 
      name: "Ugandan Shilling", 
      flag: undefined,
      logo: "/lovable-uploads/7a58db44-38c6-46d0-b3f3-e41f4113b531.png"
    },
    { 
      code: "GHS", 
      name: "Ghanaian Cedi", 
      flag: undefined,
      logo: "/lovable-uploads/d314949c-38e0-45c7-ba27-77f775e30474.png"
    },
    { 
      code: "NGN", 
      name: "Nigerian Naira", 
      flag: undefined,
      logo: "/lovable-uploads/1eea5b63-0e8b-4dc7-8dba-0c44c3d34301.png"
    },
    { 
      code: "KES", 
      name: "Kenyan Shilling", 
      flag: undefined,
      logo: "/lovable-uploads/6a7dc797-779e-409e-a3dd-e87fc210c3f8.png"
    },
    { 
      code: "TZS", 
      name: "Tanzanian Shilling", 
      flag: undefined,
      logo: "/lovable-uploads/bbee5644-720c-40f2-8090-de13281f1a94.png"
    },
  ];

  useEffect(() => {
    const fetchNetworks = async () => {
      const type = paymentMethod === "bank-transfer" ? "bank" : "mobile-money";
      await fetchWithdrawNetworks({currency: fiatCurrency, type: type});
    };
    fetchNetworks();
  }, [fiatCurrency]);
  

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const details: PaymentDetails = {
      ...formData,
      network: selectedNetwork
    };

    if (paymentMethod === "bank-transfer") {
      details.accountNumber = accountNumber;
      details.accountName = accountName;
      details.branch = branch;
      details.swiftCode = swiftCode;
      details.country = country;
    } else if (paymentMethod === "mobile-money") {
      details.mobileNumber = mobileNumber;
      details.mobileMoneyName = mobileMoneyName;
      details.mobileNetwork = mobileNetwork;
      details.reason = reason;
    }

    onNext(details);
  };

  const validatingAccountNumber = async () => {
    if(selectedNetwork ==""){
      return toast({
        title: "Error",
        description: (paymentMethod === "mobile-money") ? "Select a network to verify phone number " : "Select a network to verify account number ",
        variant: "destructive"
      });
    }

    const selectedNetwork_: any = networks.filter((network) => network.id === selectedNetwork)[0];
    const key: any = "randacc_" + Math.floor(Math.random() * 10000000000000000);
    let accNo = (paymentMethod === "mobile-money") ? mobileNumber : accountNumber;
    
    if(accNo ==""){
      return toast({
        title: "Error",
        description: (paymentMethod === "mobile-money") ? "Provide phone number to verify" : "Provide account number to verify",
        variant: "destructive"
      });
    }
    accNo = `+${accNo.replace(/ /g, '')}`;

    const accountTypeOption = (paymentMethod === "mobile-money") ? "momo" : "bank";
    const sendData: any = {accountNumber: accNo, networkId: selectedNetwork_.channelIds[0], key: key, accountType: accountTypeOption}
    const response: any = await validateReceiveAccount(sendData);
    if(response?.status == true){
      setValidateAccountNumber(true);
      setValidatedAccDetails(response?.data);
    } else {
      setValidateAccountNumber(false);
      return toast({
        title: "Error",
        description: response?.message,
        variant: "destructive"
      });
    } 
  }

  return (
    <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="flex items-center mb-6">
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="mr-2"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-bold">Payment Details</h2>
        </div>

        <div className="space-y-4">
          {/* Show pre-selected amount and currency side by side with adjusted widths */}
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <div className="flex space-x-2">
              <div className="flex-1">
                <Input 
                  id="amount" 
                  value={amount || "0"} 
                  readOnly
                  className="bg-gray-50"
                  placeholder="Enter amount"
                />
              </div>
              <div className="w-48">
                <CurrencySelect
                  value={fiatCurrency || ""}
                  onChange={(value) => setFiatCurrency && setFiatCurrency(value)}
                  currencies={fiatCurrencies}
                />
              </div>
            </div>
          </div>

          
          {/* Add Network Selection */}
          <NetworkSelect
            value={selectedNetwork}
            onChange={setSelectedNetwork}
            networks={networks}
            label="Select Transfer Network"
            className="placeholder:text-gray-300"
          />


          {/* Dynamic fields based on payment method */}
          {paymentMethod === "bank-transfer" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input
                  id="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="placeholder:text-gray-300"
                />
              </div>
            </>
          )}

          {paymentMethod === "mobile-money" && (
            <>
              <div className="space-y-2">
                <Label htmlFor="mobileNumber">Mobile Money Number</Label>
                <PhoneInput
                  country={'ke'} // Default to Kenya
                  value={mobileNumber}
                  onChange={phone => setMobileNumber(phone)}
                  inputClass="w-full !h-[42px] !rounded-lg !border !border-peerpesa-primary !bg-background !px-4 !py-3 !text-base !ring-offset-background placeholder:!text-gray-300 placeholder:!font-normal focus:!outline-none focus:!ring-2 focus:!ring-peerpesa-primary focus:!ring-offset-2"
                  buttonClass="!border !border-peerpesa-primary !rounded-l-lg !bg-background"
                  containerClass="phone-input"
                  inputProps={{
                    id: 'mobileNumber',
                    placeholder: 'Enter mobile money number'
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason</Label>
                <Input
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  placeholder="Enter reason for transfer"
                  className="placeholder:text-gray-300"
                />
              </div>
            </>
          )}
          
        </div>

        {(validateAccountNumber) && 
          <div className="block gap-4">
            <div><Label htmlFor="mobileNumber"><b>Account Number</b>{validatedAccDetails?.accountNumber}</Label></div>
            <div><Label htmlFor="mobileNumber"><b>Account Name</b> {validatedAccDetails?.accountName}</Label></div>
          </div>  
        }

        <div className="flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>

          {(!validateAccountNumber) && 
              <Button
              type="button"
              variant="red"
              className="flex-1"
              onClick={validatingAccountNumber}
              >
                Validate {paymentMethod === "mobile-money" ? "Phone Number" : "Account Number"}
              </Button>
          }

          {(validateAccountNumber) && 
            <Button
                      type="submit"
                      variant="red"
                      className="flex-1"
                    >
                      Continue
           </Button>
          }
          

          

        </div>
      </form>
    </Card>
  );
};
