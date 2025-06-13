
import React, { useState, useEffect } from "react";
import { AmountInput } from "@/components/transaction/amount-input";
import { CurrencySelect } from "@/components/transaction/currency-select";
import { TransactionSummary } from "@/components/transaction/transaction-summary";
import { ConfirmationDialog } from "@/components/transaction/confirmation-dialog";
import { SuccessScreen } from "@/components/transaction/success-screen";
import { ArrowLeftRight as SwapIcon, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionStep } from "@/types";
// import { useCurrency } from "@/context/CurrencyContext";
// import { formatAmount } from "@/helpers/format";

// Static data - in a real application this would come from an API
const cryptoCurrencies = [
  { code: "CELO", name: "Celo", isCrypto: true },
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
    logo: "/uploads/be634ae6-7519-49a5-93c0-c6c26dd79477.png" 
  },
];

const SwapCrypto: React.FC = () => {

  // Form state
  const [fromAmount, setFromAmount] = useState<string>("");
  const [fromCurrency, setFromCurrency] = useState<string>("CELO");
  const [toCurrency, setToCurrency] = useState<string>("USDT");
  const [toAmount, setToAmount] = useState<string>("0");
  // const { fetchCurrencyExchangeRates } = useCurrency();

  
  const [rates, setRates] = useState<any[]>([]);
  const [currentRates, setCurrentRates] = useState<string>("");
  
  // UI state
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<TransactionStep>('initial');
  
  // Add wallet address for the receipt
  const [walletAddress, setWalletAddress] = useState<string>("Your Wallet (0x1234...5678)");
  
  // Calculate receive amount (simplified - in real world this would use exchange rates)
  const calculateToAmount = (amount: string): string => {
    if (!amount || isNaN(Number(amount))) return "0";
    
    // Mock exchange rates (simplified)
    const rates: Record<string, Record<string, number>> = {
      "CELO": { "USDT": 0.65, "XLM": 2.3, "cUSD": 0.85, "USDC": 0.65 },
      "USDT": { "CELO": 1.5, "XLM": 3.5, "cUSD": 1, "USDC": 1 },
      "XLM": { "CELO": 0.43, "USDT": 0.29, "cUSD": 0.28, "USDC": 0.29 },
      "cUSD": { "CELO": 1.2, "USDT": 1, "XLM": 3.6, "USDC": 1 },
      "USDC": { "CELO": 1.5, "USDT": 1, "XLM": 3.5, "cUSD": 1 },
    };
    
    if (fromCurrency === toCurrency) return amount;
    
    const rate = rates[fromCurrency]?.[toCurrency] || 1;
    return (Number(amount) * rate).toFixed(6);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateToAmount(value));
  };

  // Swap currencies
  const handleSwapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
    
    // Recalculate amounts
    setToAmount(calculateToAmount(fromAmount));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAmount) return;
    setShowConfirmation(true);
  };

  // Handle transaction confirmation
  const handleConfirmTransaction = () => {
    setShowConfirmation(false);
    setCurrentStep('success');
  };

  // Get exchange rate for display
  const getExchangeRate = (): string => {
    if (fromCurrency === toCurrency) return "1";
    
    // Use the same mock rates as above
    const rates: Record<string, Record<string, number>> = {
      "CELO": { "USDT": 0.65, "XLM": 2.3, "cUSD": 0.85, "USDC": 0.65 },
      "USDT": { "CELO": 1.5, "XLM": 3.5, "cUSD": 1, "USDC": 1 },
      "XLM": { "CELO": 0.43, "USDT": 0.29, "cUSD": 0.28, "USDC": 0.29 },
      "cUSD": { "CELO": 1.2, "USDT": 1, "XLM": 3.6, "USDC": 1 },
      "USDC": { "CELO": 1.5, "USDT": 1, "XLM": 3.5, "cUSD": 1 },
    };
    
    return rates[fromCurrency]?.[toCurrency]?.toString() || "1";
  };

  // Transaction details for summary and confirmation
  const fee = Number(fromAmount || 0) * 0.005; // 0.5% fee
  const transactionDetails = [
    { label: "From", value: `${fromAmount || "0"} ${fromCurrency}` },
    { label: "Exchange Rate", value: `1 ${fromCurrency} = ${getExchangeRate()} ${toCurrency}` },
    { label: "Network Fee", value: `${fee.toFixed(6)} ${fromCurrency}` },
    { label: "You Receive", value: `${toAmount} ${toCurrency}`, isTotal: true },
  ];

  const resetTransaction = () => {
    setFromAmount("");
    setToAmount("0");
    setCurrentStep('initial');
  };


  useEffect(() => {
    const initFun = async() => {

     if(fromCurrency === null){
      return;
     }  
    //  const eRates  =   await  fetchCurrencyExchangeRates({quote_coin: fromCurrency});
    //  const constCurrent: any  = eRates?.data.filter((rate: any) => rate.symbol.toUpperCase() === toCurrency.toUpperCase())
    //  setCurrentRates(constCurrent[0].price.amount);
    //  setRates(eRates?.data ?? []);

   } 
   initFun();
  }, [fromCurrency]);

  const renderTransactionStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              {/* Updated layout - You pay section with adjusted widths */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">You pay</label>
                  <div className="flex space-x-2">
                    <div className="flex-1 -mr-2">
                      <AmountInput
                        value={fromAmount}
                        onChange={handleFromAmountChange}
                        placeholder="0"
                        hideLabel
                      />
                    </div>
                    <div className="w-42">
                      <CurrencySelect
                        value={fromCurrency}
                        onChange={setFromCurrency}
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

              <div className="flex justify-center -my-2 z-10 relative">
                <Button 
                  type="button" 
                  onClick={handleSwapCurrencies}
                  variant="outline"
                  size="icon"
                  className="rounded-full bg-gray-50 border-gray-200 hover:bg-gray-100"
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>
              
              {/* Updated layout - You receive section with adjusted widths */}
              <div className="mt-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">You receive</label>
                  <div className="flex space-x-2">
                    <div className="flex-1 -mr-2">
                      <AmountInput
                        value={toAmount}
                        onChange={setToAmount}
                        placeholder="0"
                        readOnly
                        hideLabel
                      />
                    </div>
                    <div className="w-42">
                      <CurrencySelect
                        value={toCurrency}
                        onChange={setToCurrency}
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
              
              <div className="bg-gray-50 -mx-6 px-6 py-2 mb-6 flex items-center justify-center text-sm text-gray-500">
                1 {fromCurrency} = {getExchangeRate()} {toCurrency}
              </div>
              
              <TransactionSummary details={transactionDetails} />
              
              <Button
                type="submit"
                disabled={!fromAmount}
                className="w-full bg-peerpesa-red hover:bg-peerpesa-red-dark text-white py-4 flex items-center justify-center gap-2"
              >
                <SwapIcon className="h-4 w-4" /> Review Swap
              </Button>
            </form>
          </Card>
        );

      case 'success':
        return (
          <SuccessScreen
            title="Swap Complete!"
            message={`Successfully swapped ${fromAmount} ${fromCurrency} to ${toAmount} ${toCurrency}`}
            details={transactionDetails}
            transactionId="TX456789123"
            backToPath="/swap"
            backButtonText="Swap More"
            onBackClick={resetTransaction}
            recipient={walletAddress}
          />
        );

      default:
        return null;
    }
  };

  return (
      <div className="container_ max-w-md_ mx-auto_">
        {renderTransactionStep()}
        
        <ConfirmationDialog
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmTransaction}
          title="Confirm Swap"
          description="Please review your swap details below."
          details={transactionDetails}
          confirmText="Swap Now"
        />
      </div>
  );
};

export default SwapCrypto;
