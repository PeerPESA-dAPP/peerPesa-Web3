"use client"

import type React from "react"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { injected } from 'wagmi/connectors';
import { sepolia } from 'wagmi/chains';

// const config = createConfig({
//   chains: [mainnet],
//   connectors: [injected()],
//   transports: {
//     [mainnet.id]: http(), // or http('https://rpc-url')
//   },
// });
// using test net 
const config = createConfig({
  chains: [sepolia],
  connectors: [injected()],
  transports: {
    [sepolia.id]: http('https://sepolia.infura.io/v3/b5833426d2934f8caa7c1d3654cc967b'), // or Alchemy/Ankr
  },
});

import Image from "next/image"
import { ChevronRight } from "lucide-react"
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

const queryClient = new QueryClient()

// Define cryptocurrency types
interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  icon: React.ReactNode
  color: string
}

export default function Home() {
  // Updated cryptocurrency data with actual logo images
  const cryptoCurrencies: CryptoCurrency[] = [
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      balance: "350.75",
      fiatValue: "$350.75",
      icon: <Image src="/images/tether-usdt-logo.png" alt="USDT" width={24} height={24} className="w-6 h-6" />,
      color: "#26A17B",
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      balance: "425.50",
      fiatValue: "$425.50",
      icon: <Image src="/images/usd-coin-usdc-logo.png" alt="USDC" width={24} height={24} className="w-6 h-6" />,
      color: "#2775CA",
    },
    {
      id: "cusd",
      name: "Celo Dollar",
      symbol: "cUSD",
      balance: "210.25",
      fiatValue: "$210.25",
      icon: <Image src="/images/cusd-logo.png" alt="cUSD" width={24} height={24} className="w-6 h-6" />,
      color: "#35D07F",
    },
    {
      id: "celo",
      name: "Celo",
      symbol: "CELO",
      balance: "45.75",
      fiatValue: "$68.63",
      icon: <Image src="/images/celo-celo-logo.png" alt="CELO" width={24} height={24} className="w-6 h-6" />,
      color: "#FBCC5C",
    },
  ]

  const [selectedCrypto, setSelectedCrypto] = useState<CryptoCurrency>(cryptoCurrencies[0])
  const [sendOpen, setSendOpen] = useState(false)
  const [receiveOpen, setReceiveOpen] = useState(false)
  const [swapOpen, setSwapOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)

  const updateBalance = (cryptoId: string, newBalance: string) => {
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
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-3">
                <Button
                  onClick={() => setSendOpen(true)}
                  className="flex items-center justify-center h-12 space-x-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                >
                  <Image src="/images/send.svg" alt="Send" width={20} height={20} className="text-white" />
                  <span>Send</span>
                </Button>
                <Button
                  onClick={() => setReceiveOpen(true)}
                  className="flex items-center justify-center h-12 space-x-2 bg-primary hover:bg-primary/90 text-white rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v12" />
                    <path d="M8 10h8" />
                  </svg>
                  <span>Buy</span>
                </Button>
                <Button
                  onClick={() => setSwapOpen(true)}
                  className="flex items-center justify-center h-12 space-x-2 bg-gray-300 hover:bg-gray-400 text-black rounded-md"
                >
                  <Image src="/images/swap-black.svg" alt="Swap" width={20} height={20} className="text-black" />
                  <span>Swap</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Other Cryptocurrencies */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-secondary">Your Assets</h2>
              <Button variant="ghost" size="sm" className="text-primary">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {cryptoCurrencies.map((crypto) => (
                <CryptoBalanceCard
                  key={crypto.id}
                  crypto={crypto}
                  isSelected={selectedCrypto.id === crypto.id}
                  onClick={() => setSelectedCrypto(crypto)}
                />
              ))}
            </div>
          </div>

          {/* Transaction History */}
          <Card className="border-none shadow-md">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg text-secondary">Transaction History</CardTitle>
            </CardHeader>
            <CardContent className="p-0 pt-2">
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
          </Card>
        </main>

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

        <ReceiveModal open={receiveOpen} onOpenChange={setReceiveOpen} cryptoCurrencies={cryptoCurrencies} />

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

        <SettingsModal open={settingsOpen} onOpenChange={setSettingsOpen} />
      </div>
     </div>
     </QueryClientProvider>
    </WagmiProvider>  
  )
}
