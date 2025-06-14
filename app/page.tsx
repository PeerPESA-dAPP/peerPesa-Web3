"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { TabButtons } from "@/components/transaction/tab-buttons";
import { sepolia } from 'wagmi/chains';
import { SendIcon, CreditCard, ArrowLeftRight, CheckCircle, Shield, Headphones, ChevronRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import TransactionList from "@/components/transaction-list"
import SendModal from "@/components/send-modal"
import ReceiveModal from "@/components/receive-modal"
import SwapModal from "@/components/swap-modal"
import SettingsModal from "@/components/settings-modal"
import CryptoBalanceCard from "@/components/crypto-balance-card"
import ForexBalanceCard from "@/components/forex-balance-card"  

import SendMoney from "./exchange/SendMoney";
import BuyCrypto from "./exchange/BuyCrypto";
import SwapCrypto from "./exchange/SwapCrypto";
import Link from "next/link"
import Image from "next/image"
import Footer from "@/components/Footer"
import { useCurrencies } from "@/hooks/useCurrencies"
import { usePaymentWallets, useWithdrawRates } from "@/hooks/useCurrencies"

const queryClient = new QueryClient()

// Define cryptocurrency types
interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  token_type: string
  icon: React.ReactNode
  color: string
  price: any
}

// using test net 
const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/b5833426d2934f8caa7c1d3654cc967b'), // or Alchemy/Ankr
  },
});

export default function Home() {
  // Updated cryptocurrency data with actual logo images
  const { currencies: supportedCurrencies, loading, error } = useCurrencies();
  // const { paymentWallets, loading: walletsLoading, error: walletsError } = usePaymentWallets();
  const [selectedTab, setSelectedTab] = useState<"send" | "buy" | "swap">("send")
  const [selectedNav, setSelectedNav] = useState<"home" | "send" | "transactions">("home")
  const [defaultCurrency, setDefaultCurrency] = useState("USD")
  
  // Fetch withdraw rates for the default currency
  const { withdrawRates, loading: withdrawRatesLoading, error: withdrawRatesError } = useWithdrawRates(defaultCurrency);

  // Convert supported currencies to crypto currency format with mock data
  const cryptoCurrencies: CryptoCurrency[] = (supportedCurrencies || []).map((currency) => ({
    id: currency?.id,
    name: currency?.name,
    symbol: currency?.symbol,
    token_type: currency?.token_type,
    balance: "0.0000", // Mock balance
    fiatValue: "0.00", // Mock fiat value
    price: currency?.price,
    icon: currency?.icon ? (
      <img 
        src={`/flags/${currency?.symbol?.toLowerCase()}.png`} 
        alt={currency.name} 
        className="w-9 h-8 rounded-full"
      />
    ) : (
      <div className="w-9 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-xs font-bold">{currency.symbol}</span>
      </div>
    ),
    color: "#3B82F6" // Default blue color
  }));

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>({
    id: "",
    name: "",
    symbol: "",
    balance: "0.0000",
    fiatValue: "0.00",
    token_type: "",
    icon: <div className="w-8 h-8 rounded-full bg-gray-300" />,
    color: "#3B82F6",
    price: {
      amount: 0.00,
      currency: "USD",
      id: "",
      base_coin: "",
      quote_coin: "USD",
      buy_markup: 0,
      sell_markup: 0,
      exchange_markup: 0,
      source: "",
      status: "active"
    }
  })
  const [selectedFiat, setSelectedFiat] = useState<CryptoCurrency>();
  const [sendOpen, setSendOpen] = useState(false)
  const [receiveOpen, setReceiveOpen] = useState(false)
  const [swapOpen, setSwapOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  // Update selectedCrypto when currencies load
  useEffect(() => {
    if (cryptoCurrencies.length > 0 && !selectedCrypto.id) {
      setSelectedCrypto(cryptoCurrencies[0]);
    }
  }, [cryptoCurrencies, selectedCrypto.id]);

  const updateBalance = (cryptoId: string, newBalance: string) => {

     ///
    const updatedCurrencies = cryptoCurrencies.map((crypto) => {
      if (crypto.id === cryptoId) {
        return { ...crypto, balance: newBalance }
      }
      return crypto
    })

    // Update the selected crypto if it's the one being modified
    if (selectedCrypto.id === cryptoId) {
      const updated = updatedCurrencies.find((c) => c.id === cryptoId)
      if (updated) setSelectedCrypto(updated)
    }
  }


  const onTabChangeFinal = (tab: any) => {
    setSelectedTab(tab)
  }

 
  const onNavChangeFinal = (tab: any) => {
    setSelectedNav(tab)
  }


  
  // Update the main container to maintain mobile width on desktop
  // Change the outer div to add a max-width and center it
  return (
     <WagmiProvider config={config}> 
     <QueryClientProvider client={queryClient}>
     <div className="flex justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col w-full max-w-[480px] bg-white shadow-xl">
        <Header onSettingsClick={() => setSettingsOpen(true)} />

        <main className="flex-1 p-4 pt-6 md:p-6">


          {/* Main Balance Card */}
          {(selectedNav === "home" || selectedNav === "transactions") && (
          <Card className="mb-6 border-none shadow-lg overflow-hidden">
            <CardHeader className="pb-3 bg-gray-300 text-gray-800">
              <CardDescription className="text-gray-600">Your Balance</CardDescription>
              <div className="flex items-center">
                {selectedCrypto.icon}
                <CardTitle className="text-3xl font-bold ml-2">
                  {selectedCrypto.balance} {selectedCrypto.symbol}
                </CardTitle>
              </div>
              <CardDescription className="text-right text-gray-600">≈ {selectedCrypto.fiatValue} USD</CardDescription>
            </CardHeader>
          </Card>
          )}


          {/* Other Cryptocurrencies */}
          {selectedNav === "home" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-lg font-semibold text-secondary">Assets</h2>
                <Button variant="ghost" size="sm" className="text-primary hidden">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cryptoCurrencies.length > 0 && cryptoCurrencies.filter((crypto: any) => crypto?.token_type === "Native").map((crypto: any) => (
                  <CryptoBalanceCard
                    key={crypto.id}
                    crypto={crypto}
                    defaultCurrency={defaultCurrency}
                    yellowCardRates={withdrawRates?.data?.rates?.find((rate: any) => rate.code.toLowerCase() === crypto.symbol.toLowerCase())}
                    isSelected={selectedCrypto.id === crypto.id}
                    onClick={() => setSelectedCrypto(crypto)}
                  />
                ))}
              </div>



              <div className="flex justify-between items-center mb-3 mt-4">
                <h2 className="text-lg font-semibold text-secondary">Exchange Rates</h2>
                <Button variant="ghost" size="sm" className="text-primary hidden">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cryptoCurrencies.length > 0 && cryptoCurrencies.filter((crypto: any) => crypto?.token_type !== "Native").map((crypto: any) => (
                  <ForexBalanceCard
                    key={crypto.id}
                    crypto={crypto}
                    defaultCurrency={defaultCurrency}
                    yellowCardRates={withdrawRates?.data?.rates?.find((rate: any) => rate.code.toLowerCase() === crypto.symbol.toLowerCase())}
                    isSelected={selectedCrypto.id === crypto.id}
                    onClick={() => setSelectedFiat(crypto)}
                  />
                ))}
              </div>

              {/* Withdraw Rates Section */}
              {/* {withdrawRates?.data?.rates && withdrawRates.data.rates.length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-secondary">Exchange Rates ({defaultCurrency})</h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {withdrawRates.data.rates.filter((rate: any) => rate.code.toLowerCase() === cryptoCurrencies.find((crypto: any) => crypto.token_type === "fiat")?.symbol.toLowerCase()).slice(0, 8).map((rate: any) => (
                      <Card key={rate.code} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {rate.locale === 'crypto' ? 'CT' : 'FI'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{rate.code} {defaultCurrency}</h3>
                              <p className="text-sm text-gray-500">{rate.rateId} {defaultCurrency}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-gray-900">Buy: {rate.buy}</p>
                            <p className="text-sm text-gray-500">Sell: {rate.sell}</p>
                            <p className="text-xs text-gray-400">{new Date(rate.updatedAt).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Loading and Error States for Withdraw Rates */}
              {/* {withdrawRatesLoading && (
                <div className="mt-8 text-center">
                  <p className="text-gray-500">Loading exchange rates...</p>
                </div>
              )}
              
              {withdrawRatesError && (
                <div className="mt-8 text-center">
                  <p className="text-red-500">Error loading exchange rates: {withdrawRatesError}</p>
                </div>
              )} */}

              {/* Payment Wallets Section */}
              {/* {(paymentWallets || []).length > 0 && (
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-semibold text-secondary">Payment Wallets</h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                      View All <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {(paymentWallets || []).map((wallet) => (
                      <Card key={wallet.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                              <span className="text-sm font-semibold text-gray-600">
                                {wallet.type === 'bank' ? '🏦' : wallet.type === 'mobile_money' ? '📱' : '₿'}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">{wallet.name}</h3>
                              <p className="text-sm text-gray-500">{wallet.currency} • {wallet.type}</p>
                              {wallet.accountNumber && (
                                <p className="text-xs text-gray-400">Account: {wallet.accountNumber}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`w-3 h-3 rounded-full ${wallet.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <p className="text-xs text-gray-500 mt-1">{wallet.isActive ? 'Active' : 'Inactive'}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )} */}

              {/* Loading and Error States */}
              {/* {walletsLoading && (
                <div className="mt-8 text-center">
                  <p className="text-gray-500">Loading supported currencies...</p>
                </div>
              )}
              
              {walletsError && (
                <div className="mt-8 text-center">
                  <p className="text-red-500">Error loading supported currencies: {walletsError}</p>
                </div>
              )} */}
            </div>
          )}





          {selectedNav === "send" && (
            
             <>
                <div className="mb-6">
                  <TabButtons activeTab={selectedTab} onTabChange={onTabChangeFinal} />
                </div>
                
                <div className="mb-6">
                {selectedTab === "send" && <SendMoney />}
                {selectedTab === "buy" && <BuyCrypto />}
                {selectedTab === "swap" && <SwapCrypto />}
                </div>
             </>

          )}




          {/* Transaction History */}
          {selectedNav === "transactions" && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <h2 className="text-lg font-semibold text-secondary">Wallet Activity</h2>
                <Button variant="ghost" size="sm" className="text-primary">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <CardContent className="p-0 pt-0">
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 mb-4 bg-gray-100">
                    <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="sent" className="data-[state=active]:bg-primary data-[state=active]:text-white">
                      Sent
                    </TabsTrigger>
                    <TabsTrigger
                      value="received"
                      className="data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      Received
                    </TabsTrigger>
                  </TabsList>
                  <div className="px-4 pb-4">
                    <TabsContent value="all">
                      <TransactionList />
                    </TabsContent>
                    <TabsContent value="sent">
                      <TransactionList type="sent" />
                    </TabsContent>
                    <TabsContent value="received">
                      <TransactionList type="received" />
                    </TabsContent>
                  </div>
                </Tabs>
              </CardContent>
            </div>
          )}
        </main>
        <Footer activeNav={selectedNav} onNavChange={onNavChangeFinal} />




        <SendModal
          open={sendOpen}
          onOpenChange={setSendOpen}
          cryptoCurrencies={cryptoCurrencies}
          selectedCrypto={selectedCrypto}
          onSuccess={(cryptoId, amount) => {
            if (cryptoId === selectedCrypto.id) {
              const newBalance = (Number.parseFloat(selectedCrypto.balance) - Number.parseFloat(amount)).toFixed(4)
              updateBalance(cryptoId, newBalance)
            }
          }}
        />

        <ReceiveModal open={receiveOpen} 
                      onOpenChange={setReceiveOpen} 
                      cryptoCurrencies={cryptoCurrencies} />

        <SwapModal
          open={swapOpen}
          onOpenChange={setSwapOpen}
          cryptoCurrencies={cryptoCurrencies}
          onSuccess={(fromCryptoId, toCryptoId, fromAmount, toAmount) => {
            // Update the balance of the "from" cryptocurrency
            const fromCrypto = cryptoCurrencies.find((c) => c.id === fromCryptoId)
            if (fromCrypto) {
              const newFromBalance = (Number.parseFloat(fromCrypto.balance) - Number.parseFloat(fromAmount)).toFixed(4)
              updateBalance(fromCryptoId, newFromBalance)
            }

            // Update the balance of the "to" cryptocurrency
            const toCrypto = cryptoCurrencies.find((c) => c.id === toCryptoId)
            if (toCrypto) {
              const newToBalance = (Number.parseFloat(toCrypto.balance) + Number.parseFloat(toAmount)).toFixed(4)
              updateBalance(toCryptoId, newToBalance)
            }
          }}
        />

        <SettingsModal 
                      open={settingsOpen} 
                      onOpenChange={setSettingsOpen} />
      
      
      </div>
     </div>
     </QueryClientProvider>
    </WagmiProvider>  
  )
}
