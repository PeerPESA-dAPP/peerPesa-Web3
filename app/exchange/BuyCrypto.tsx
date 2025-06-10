import React, { useState, useEffect } from "react";
import { TabButtons } from "@/components/transaction/tab-buttons";
import { AmountInput } from "@/components/transaction/amount-input";
import { CurrencySelect } from "@/components/transaction/currency-select";
import { PaymentMethodSelect } from "@/components/transaction/payment-method-select";
import { TransactionSummary } from "@/components/transaction/transaction-summary";
import { ConfirmationDialog } from "@/components/transaction/confirmation-dialog";
import { SuccessScreen } from "@/components/transaction/success-screen";
import { PaymentDetailsForm } from "@/components/transaction/payment-details-form";
import { CreditCard, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionStep } from "@/types";
import { useCurrency } from "@/context/CurrencyContext";
import { formatAmount } from "@/helpers/format";

// Static data - in a real application this would come from an API
const currencies = [
  { 
    code: "ZAR", 
    name: "South African Rand", 
    logo: "/uploads/1a4a5bea-1094-43d5-9a00-58c270d7a092.png" 
  },
  { 
    code: "UGX", 
    name: "Ugandan Shilling", 
    logo: "/uploads/bbe5cad3-2029-4571-8d50-3d3ade16a4d4.png" 
  },
  { 
    code: "GHS", 
    name: "Ghanaian Cedi", 
    logo: "/uploads/62d888cc-ac19-4277-8610-f0adf8760b75.png" 
  },
  { 
    code: "NGN", 
    name: "Nigerian Naira", 
    logo: "/uploads/254c931e-4649-4114-ae35-70aa080b6bf5.png" 
  },
  { 
    code: "KES", 
    name: "Kenyan Shilling", 
    logo: "/uploads/d9daa914-da84-4774-864c-c71bb5d11cbd.png" 
  },
  { 
    code: "TZS", 
    name: "Tanzanian Shilling", 
    logo: "/uploads/085ed576-4870-4c63-ade6-9896ec277083.png" 
  },
];

const cryptoCurrencies = [
  { 
    code: "CELO", 
    name: "Celo", 
    isCrypto: true, 
    logo: "/uploads/df44736c-1776-4fb6-8476-95391588e667.png" 
  },
  { 
    code: "XLM", 
    name: "Stellar", 
    isCrypto: true, 
    logo: "/uploads/6736b411-4d6a-4ad3-9175-e450ae8bba55.png" 
  },
  { 
    code: "USDT", 
    name: "Tether", 
    isCrypto: true, 
    logo: "/uploads/a125f4a5-a2b2-4c5f-9180-1b02bd7477b9.png"
  },
  { 
    code: "cUSD", 
    name: "Celo Dollar", 
    isCrypto: true, 
    logo: "/uploads/c33c074f-6d66-4373-996f-c0671f45f82c.png" 
  },
  { 
    code: "USDC", 
    name: "USD Coin", 
    isCrypto: true, 
    logo: "/uploads/8fb234d7-fe30-4774-8836-a6534946905e.png"
  },
];

// Update the payment methods array with icons
const paymentMethods = [
  { 
    id: "credit-card", 
    name: "Credit/Debit Card", 
    icon: <CreditCard className="h-4 w-4 text-purple-600" />
  },
  { 
    id: "mobile-money", 
    name: "Mobile Money", 
    icon: <Phone className="h-4 w-4 text-green-600" />
  },
];

const BuyCrypto: React.FC = () => {
  // Form state
  const [spendAmount, setSpendAmount] = useState<string>("");
  const [fiatCurrency, setFiatCurrency] = useState<string>("UGX");
  const { fetchCurrencyExchangeRates } = useCurrency();
  const [rates, setRates] = useState<any[]>([]);
  const [currentRates, setCurrentRates] = useState<string>("");
  const [defaultCurrency, setDefaultCurrency] = useState(fiatCurrency);
  const [cryptoCurrency, setCryptoCurrency] = useState<string>("CELO");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("0");
  
  // UI state
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<TransactionStep>('initial');
  const [finalCurrency, setFinalCurrency] = useState<string>("ZAR");

  // Add payment details state
  const [paymentDetails, setPaymentDetails] = useState<Record<string, string>>({});
  const [walletAddress, setWalletAddress] = useState<string>("");
  
  // Calculate crypto amount (simplified - in real world this would use crypto prices)
  const calculateCryptoAmount = (amount: string): string => {
    if (!amount || isNaN(Number(amount))) return "0";
    // Mock exchange rate: 1 ZAR = 0.05 CELO
    return (Number(amount) / Number(currentRates)).toFixed(4);
  };

  const handleSpendAmountChange = (value: string) => {
    setSpendAmount(value);

    setReceiveAmount(calculateCryptoAmount(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!spendAmount || !paymentMethod) return;
    setShowConfirmation(true);
  };

  // Handle transaction confirmation
  const handleConfirmTransaction = () => {
    setShowConfirmation(false);
    setCurrentStep('success');
  };

  const resetTransaction = () => {
    setSpendAmount("");
    setReceiveAmount("0");
    setPaymentMethod("");
    setPaymentDetails({});
    setWalletAddress("");
    setCurrentStep('initial');
  };

  // Transaction details for summary and confirmation
  const transactionDetails = [
    { label: "You pay", value: `${spendAmount || "0"} ${finalCurrency}` },
    { label: "Exchange rate", value: `1 ${finalCurrency} = 0.05 ${cryptoCurrency}` },
    { label: "Fee", value: `${(Number(spendAmount || 0) * 0.01).toFixed(2)} ${finalCurrency}` },
    { label: "You receive", value: `${receiveAmount} ${cryptoCurrency}`, isTotal: true },
  ];

  const handleNext = () => {
    if (currentStep === 'initial') {
      setFinalCurrency(fiatCurrency);
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      setShowConfirmation(true);
    }
  };

  const handleBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('initial');
    }
  };

  // Update currency from the payment details form
  const handleCurrencyUpdate = (selectedCurrency: string) => {
    setFinalCurrency(selectedCurrency);
  };

  // Update wallet address from the payment details form
  const handleWalletAddressUpdate = (address: string) => {
    setWalletAddress(address);
  };

  // New function to handle the payment details update
  const handlePaymentDetailsUpdate = (details: Record<string, string>) => {
    setPaymentDetails(details);
  };

  React.useEffect(() => {
    // This recalculates the transaction details when the currency changes
  }, [finalCurrency, spendAmount, cryptoCurrency]);

  useEffect(() => {
    const initFun = async() => {

     if(fiatCurrency === null){
      return;
     }  
     const eRates  =   await  fetchCurrencyExchangeRates({quote_coin: fiatCurrency});
     const constCurrent: any  = eRates?.data.filter((rate: any) => rate.symbol.toUpperCase() === cryptoCurrency.toUpperCase())
     setCurrentRates(constCurrent[0].price.amount);
     setRates(eRates?.data ?? []);

   } 
   initFun();
  }, [fiatCurrency]);

  useEffect(() => {
   const initFun = async() => {

      const constCurrent: any  = rates?.filter((rate: any) => rate.symbol.toUpperCase() === cryptoCurrency.toUpperCase())
      if(constCurrent[0].price.amount) {
        setCurrentRates(constCurrent[0].price.amount);
      }else{
        setCurrentRates(0);
      }
      await handleSpendAmountChange(spendAmount);
   } 
   initFun();
  }, [cryptoCurrency, rates, currentRates]);

  const renderTransactionStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="p-6">
              {/* Updated layout - You pay section with adjusted widths */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">You pay</label>
                  <div className="flex space-x-2">
                    <div className="flex-1 -mr-2">
                      <AmountInput
                        value={spendAmount}
                        onChange={handleSpendAmountChange}
                        placeholder="0"
                        hideLabel
                      />
                    </div>
                    <div className="w-42">
                      <CurrencySelect
                        value={fiatCurrency}
                        onChange={setFiatCurrency}
                        currencies={currencies}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 -mx-6 px-6 py-2 flex items-center justify-center text-sm text-gray-500">
                1 {cryptoCurrency} ~ {formatAmount(currentRates, 4)} {fiatCurrency}
              </div>
              {/* Updated layout - You receive section with adjusted widths */}
              <div className="mt-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">You receive</label>
                  <div className="flex space-x-2">
                    <div className="flex-1 -mr-2">
                      <AmountInput
                        value={receiveAmount}
                        onChange={setReceiveAmount}
                        placeholder="0"
                        readOnly
                        hideLabel
                      />
                    </div>
                    <div className="w-42">
                      <CurrencySelect
                        value={cryptoCurrency}
                        onChange={setCryptoCurrency}
                        currencies={cryptoCurrencies.map(currency => ({
                          ...currency,
                          logo: currency.code === "CELO" 
                            ? "/uploads/df44736c-1776-4fb6-8476-95391588e667.png" 
                            : currency.logo
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <PaymentMethodSelect
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  methods={paymentMethods}
                  label="Payment method"
                />
              </div>
              
              <TransactionSummary details={[
                { label: "You pay", value: `${spendAmount || "0"} ${fiatCurrency}` },
                { label: "Exchange rate", value: `1 ${fiatCurrency} = ${formatAmount(1/currentRates, 4)} ${cryptoCurrency}` },
                { label: "Fee", value: `${(Number(spendAmount || 0) * 0.01).toFixed(2)} ${fiatCurrency}` },
                { label: "You receive", value: `${receiveAmount} ${cryptoCurrency}`, isTotal: true },
              ]} />
              
              <Button
                type="submit"
                disabled={!spendAmount || !paymentMethod}
                className="w-full bg-peerpesa-primary hover:bg-peerpesa-primary-dark text-white py-4 flex items-center justify-center gap-2"
              >
                <CreditCard className="h-4 w-4" /> Review Purchase
              </Button>
            </form>
          </Card>
        );

      case 'details':
        return (
          <PaymentDetailsForm
            onBack={handleBack}
            onNext={handleNext}
            paymentMethod={paymentMethod}
            amount={spendAmount}
            currency={finalCurrency}
            onCurrencyChange={handleCurrencyUpdate}
            onWalletAddressChange={handleWalletAddressUpdate}
            onPaymentDetailsChange={handlePaymentDetailsUpdate}
          />
        );

      case 'success':
        return (
          <SuccessScreen
            title="Purchase Complete!"
            message={`Successfully purchased ${receiveAmount} ${cryptoCurrency}`}
            details={transactionDetails}
            transactionId="TX123456789"
            backToPath="/buy"
            backButtonText="Buy More Crypto"
            onBackClick={resetTransaction}
            recipient={walletAddress}
            paymentDetails={paymentDetails}
            paymentMethod={paymentMethod}
          />
        );

      default:
        return null;
    }
  };

  return (
      <div className="container max-w-md mx-auto">
        <TabButtons activeTab="buy" />
        {renderTransactionStep()}
        
        <ConfirmationDialog
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmTransaction}
          title="Confirm Purchase"
          description="Please review your crypto purchase details below."
          details={transactionDetails}
          paymentDetails={paymentDetails}
          paymentMethod={paymentMethod}
          confirmText="Buy Now"
        />
      </div>
  );
};

export default BuyCrypto;
