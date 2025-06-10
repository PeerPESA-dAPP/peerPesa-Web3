import React, { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TabButtons } from "@/components/transaction/tab-buttons";
import { AmountInput } from "@/components/transaction/amount-input";
import { CurrencySelect } from "@/components/transaction/currency-select";
import { PaymentMethodSelect } from "@/components/transaction/payment-method-select";
import { TransactionSummary } from "@/components/transaction/transaction-summary";
import { ConfirmationDialog } from "@/components/transaction/confirmation-dialog";
import { SuccessScreen } from "@/components/transaction/success-screen";
import { SendDetailsForm } from "@/components/transaction/send-details-form";
import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TransactionStep, TransactionSummaryItem, Currency } from "@/types";
import { useCurrency } from "@/hooks/useCurrency";
import { formatAmount } from "@/utils/format";
import { GET_CRYPTO_FEES, PAYMENT_METHODS } from "@/utils/constants";
import html2canvas from "html2canvas";

// Static data - in a real application this would come from an API
const currencies: Currency[] = [
  { 
    code: "ZAR", 
    name: "South African Rand", 
    flag: undefined,
    logo: "/uploads/07b76ca7-e77b-4939-8e77-a6dacceeba1b.png"
  },
  { 
    code: "UGX", 
    name: "Ugandan Shilling", 
    flag: undefined,
    logo: "/uploads/7a58db44-38c6-46d0-b3f3-e41f4113b531.png"
  },
  { 
    code: "GHS", 
    name: "Ghanaian Cedi", 
    flag: undefined,
    logo: "/uploads/d314949c-38e0-45c7-ba27-77f775e30474.png"
  },
  { 
    code: "NGN", 
    name: "Nigerian Naira", 
    flag: undefined,
    logo: "/uploads/1eea5b63-0e8b-4dc7-8dba-0c44c3d34301.png"
  },
  { 
    code: "KES", 
    name: "Kenyan Shilling", 
    flag: undefined,
    logo: "/uploads/6a7dc797-779e-409e-a3dd-e87fc210c3f8.png"
  },
  { 
    code: "TZS", 
    name: "Tanzanian Shilling", 
    flag: undefined,
    logo: "/uploads/bbee5644-720c-40f2-8090-de13281f1a94.png"
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
}

// Fallback implementations for missing contexts
const useWallet = () => ({
  fetchWallets: async () => []
});

const useAuth = () => ({
  isAuthenticated: false,
  user: null,
  authenticationTokenValue: null
});

const SendMoney: React.FC = () => {
  // Form state
  const [sendAmount, setSendAmount] = useState<string>("");
  const [sendWalletAmount, setSendWalletAmount] = useState<number>(0);
  const [initReceiveAmount, setInitReceiveAmount] = useState<number>(0);
  const [totalReceiveAmount, setTotalReceiveAmount] = useState<string>("0");
  
  const [sendWallet, setSendWallet] = useState<string>("");
  const [lessBalanceAlert, setLessBalanceAlert] = useState<string>("");
  const [sendCurrency, setSendCurrency] = useState<string>("ZAR");
  const [receiveCurrency, setReceiveCurrency] = useState<string>("CELO");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [receiveAmount, setReceiveAmount] = useState<string>("0");
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const [network, setNetwork] = useState<string>("ethereum");
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails>({});
  
  const {isAuthenticated, user, authenticationTokenValue} = useAuth();
  const {fetchCurrencyExchangeRates, fetchYellowCardCurrencyExchangeRates} = useCurrency();
  const {fetchWallets} = useWallet();
  const [rates, setRates] = useState<any>([]);
  const [currentRates, setCurrentRates] = useState("");
  const [defaultCurrency, setDefaultCurrency] = useState(sendCurrency);
  const [accountWallets, setAccountWallets] = useState<any[]>([]);

  
  const [transactionFees, setTransactionFees] = useState("");
  const [transacrionTime, setTransacrionTime] = useState("");
  const [paySlippage, setPaySlippage] = useState("");
  
  // UI state
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<TransactionStep>('initial');

  // Calculate receive amount (simplified - in real world this would use exchange rates)
  const calculateReceiveAmount = (amount: string): string => {
    if (!amount || isNaN(Number(amount))) return "0";
    // Mock exchange rate: 1 ZAR = 0.05 CELO
    
    const exchangeRat: any = formatAmount(currentRates ?? 0, 4);


    let   totalAmount: any = (Number(amount) - Number(transactionFees)) * exchangeRat;
    const deductingSlippage = Number(totalAmount) * (Number(paySlippage) / 100);

    const recieveAmount: any = Number(totalAmount)- Number(deductingSlippage);
    const totalAmountWithSlippage = Number(totalAmount);
    setInitReceiveAmount(recieveAmount.toFixed(2));
    setTotalReceiveAmount(totalAmountWithSlippage.toFixed(2));
    return (recieveAmount).toFixed(2);

  };


  const checkBalance = () => {

    const numValue = Number(sendAmount);
    const walletValue = sendWalletAmount;

    if (numValue > walletValue && authenticationTokenValue) {
      setLessBalanceAlert("You have insufficient balance in your wallet");
    } else {
      setLessBalanceAlert("");
    }
  }


  const handleSendAmountChange = (value: string) => {

    const numValue = Number(value);
    const walletValue = sendWalletAmount;
    setSendAmount(value);
    setReceiveAmount(calculateReceiveAmount(value));
    if (authenticationTokenValue) {
      checkBalance();
    } else {
      setLessBalanceAlert("");
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sendAmount || !paymentMethod) return;
    setCurrentStep('details');
  };

  // Handle transaction confirmation
  const handleConfirmTransaction = () => {
    setShowConfirmation(false);
    setCurrentStep('success');
  };

  const resetTransaction = () => {
    setSendAmount("");
    setReceiveAmount("0");
    setPaymentMethod("");
    setCurrentStep('initial');
    setRecipientAddress("");
    setNetwork("ethereum");
    setPaymentDetails({});
  };

  // Process payment details from form
  const handleDetailFormSubmit = (details: PaymentDetails) => {
    setPaymentDetails(details);
    setShowConfirmation(true);
  };

  // Transaction details for summary and confirmation
  const getTransactionDetails = (): TransactionSummaryItem[] => {
    const details: TransactionSummaryItem[] = [
      { label: "Wallet Balance", value: `${sendWalletAmount || "0"} ${receiveCurrency}` },
      { label: "Sell Amount", value: `${sendAmount || "0"} ${receiveCurrency}` },
      { label: "Exchange Rate", value: `1 ${receiveCurrency} ~ ${formatAmount(currentRates, 4)} ${sendCurrency}`},
      { label: "Fees", value: `${transactionFees ?? ""} ${receiveCurrency}` },
      { label: "Transfer Time", value: `${transacrionTime ?? ""} minutes` },
      { label: "Slippage Tolerance", value: `${paySlippage ?? ""}%` },
    ];


    // Add specific payment method details
    if (currentStep === 'details' || showConfirmation) {
      if (paymentMethod === 'bank-transfer' && paymentDetails) {

        
        if (paymentDetails.accountNumber) {
          details.push({ label: "Bank Account", value: paymentDetails.accountNumber });
        }
       
      } else if (paymentMethod === 'mobile-money' && paymentDetails) {


        if (paymentDetails.mobileNumber) {
          details.push({ label: "Mobile Number", value: paymentDetails.mobileNumber });
        }
        
        if (paymentDetails.reason) {
          details.push({ label: "Reason", value: paymentDetails.reason });
        }
      }
    }
    details.push(
      { label: "Receive Amount", value: `${initReceiveAmount} ${sendCurrency}` },
      { label: "Total Amount", value: `${totalReceiveAmount} ${sendCurrency}`, isTotal: true }
    );
    return details;
 };

 const handleNext = () => {
    if (currentStep === 'initial') {
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


 const initFunc = async () => {
   const data: any = {
     authToken: authenticationTokenValue
   }
   const walletsData: any  = await  fetchWallets(data)
   if(walletsData){
     setAccountWallets(walletsData)
   }
   manageTransferSlippage();
}

useEffect(() => {
   initFunc()
}, [authenticationTokenValue]);


//     // yellow card rates 
//     const ycRates: any  =   await  fetchYellowCardCurrencyExchangeRates({base_currency: receiveCurrency})
//     const ycRate = ycRates.data.rates.filter((theYCRate : any ) => theYCRate.code.toUpperCase() === sendCurrency.toUpperCase());    
//     if(Number(ycRate[0]?.sell) > Number(filteredRates[0]?.price?.amount)){
//      setCurrentRates(ycRate[0]?.sell);
//     } else if(filteredRates[0]?.price?.amount == undefined ){
//      setCurrentRates(ycRate[0]?.sell);
//     } else {
//       setCurrentRates(filteredRates[0]?.price?.amount);
//     }






useEffect(() => {
 const initFun = async() => {
  handleSendAmountChange(sendAmount);
 } 
 initFun();
}, [receiveCurrency]);

useEffect(() => {
  const initFun = async() => {
   if(sendCurrency === null){
    return;
   }  
   const eRates  =   await  fetchCurrencyExchangeRates({quote_coin: sendCurrency});
   const constCurrent: any  = eRates?.data.filter((rate: any) => rate.symbol.toUpperCase() === receiveCurrency.toUpperCase())
   setCurrentRates(constCurrent[0].price.amount);
   setRates(eRates?.data ?? []);
 } 
 initFun();
}, [sendCurrency]);

useEffect(() => {
  const initFun = async() => {
     const constCurrent: any  = rates?.filter((rate: any) => rate.symbol.toUpperCase() === receiveCurrency.toUpperCase())
     if(constCurrent[0].price.amount) {
       const ycRates: any  =  await  fetchYellowCardCurrencyExchangeRates({base_currency: receiveCurrency})
       setCurrentRates(constCurrent[0].price.amount);
     }else{
       setCurrentRates("0");
     }
     const wallet = accountWallets.find((wallet: any) => wallet.symbol.toLowerCase() === receiveCurrency.toLowerCase());
     if(wallet){
       setSendWalletAmount(wallet?.wallet?.balance ?? 0);
       setSendWallet(wallet?.wallet?.address ?? "");
     }
     handleSendAmountChange(sendAmount);
     // await handleSpendAmountChange(spendAmount);
  } 
  initFun();
  checkBalance();
  manageTransferSlippage()
}, [rates, currentRates]);

const manageTransferSlippage = async () => {
  const FinalSlipageRates  = await GET_CRYPTO_FEES(receiveCurrency.toUpperCase() ?? "");
  setTransactionFees(FinalSlipageRates?.networks[0]?.avg_fee_usd);
  setTransacrionTime(FinalSlipageRates?.networks[0]?.transfer_time_sec?.toString() ?? "");
  setPaySlippage(FinalSlipageRates?.networks[0]?.slippage_percent);
}

  const renderTransactionStep = () => {
    switch (currentStep) {
      case 'initial':
        return (
          <Card className="bg-white rounded-lg shadow-sm overflow-hidden">
            <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="p-6">
              {/* Updated layout - Spend section with adjusted widths */}
              <div className="mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Spend {receiveCurrency}</label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <AmountInput
                        value={sendAmount}
                        onChange={handleSendAmountChange}
                        placeholder="0"
                        hideLabel
                      />
                    </div>
                    <div className="w-48">
                      <CurrencySelect
                        value={receiveCurrency}
                        onChange={setReceiveCurrency}
                        currencies={[
                          ...cryptoCurrencies.map(currency => ({
                            ...currency,
                            logo: currency.code === "CELO" 
                              ? "/uploads/df44736c-1776-4fb6-8476-95391588e667.png"
                              : currency.logo
                          }))
                        ]}
                      />
                    </div>
                  </div>
                </div>
                <label className="text-sm text-gray-500"><i className="text-red-500">{lessBalanceAlert}</i></label>
              </div>

              <div className="bg-gray-50 -mx-6 px-6 py-2 flex items-center justify-center text-sm text-gray-500">
                Estimated rate : 1 {receiveCurrency} ~ {formatAmount(currentRates, 4)} {sendCurrency}
              </div>
              
              {/* Updated layout - Recipient gets section with adjusted widths */}
              <div className="mt-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-gray-500">Recipient gets</label>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <AmountInput
                        value={receiveAmount}
                        onChange={setReceiveAmount}
                        placeholder="0"
                        readOnly
                        hideLabel
                      />
                    </div>
                    <div className="w-48">
                      <CurrencySelect
                        value={sendCurrency}
                        onChange={setSendCurrency}
                        currencies={currencies}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <PaymentMethodSelect
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                  methods={PAYMENT_METHODS}
                />
              </div>
              
              <TransactionSummary details={getTransactionDetails()} />
              
              <Button
                type="submit"
                variant="red"
                disabled={!sendAmount || !paymentMethod || lessBalanceAlert != ""}
                className="w-full text-white py-2.5 flex items-center justify-center gap-2 rounded-xl"
              >
                <SendIcon className="h-4 w-4" />
                <span>Review Transfer</span>
              </Button>
            </form>
          </Card>
        );

      case 'details':
        return (
          <SendDetailsForm
            onBack={handleBack}
            onNext={handleDetailFormSubmit}
            cryptoCurrency={receiveCurrency}
            setCryptoCurrency={setReceiveCurrency}
            amount={receiveAmount}
            setAmount={setReceiveAmount}
            paymentMethod={paymentMethod}
            fiatCurrency={sendCurrency}
            setFiatCurrency={setSendCurrency}
          />
        );

      case 'success':
        return (
          <SuccessScreen
            title="Transfer Complete!"
            message={`Successfully sent ${sendAmount} ${sendCurrency}`}
            details={getTransactionDetails()}
            transactionId="TX987654321"
            backToPath="/send"
            backButtonText="Send More Money"
            onBackClick={resetTransaction}
            recipient={recipientAddress}
          />
        );

      default:
        return null;
    }
  };
  // <div className="container max-w-ld mx-auto py-6" >

  return (
      <div className="container_ max-w-md_ mx-auto_">
        
        <TabButtons activeTab="send" />
        {renderTransactionStep()}
        <ConfirmationDialog
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmTransaction}
          title="Confirm Transfer"
          description="Please review your transfer details below."
          details={getTransactionDetails()}
          confirmText="Send Now"
        />
      </div>
  );
};

export default SendMoney;
