"use client"

import type React from "react"

import { useState } from "react"
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
  // Updated cryptocurrency data
  const cryptoCurrencies: CryptoCurrency[] = [
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      balance: "350.75",
      fiatValue: "$350.75",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="#26A17B"
          />
          <path
            d="M17.922 17.383V18.616C17.4 18.6636 16.7376 18.7112 15.9948 18.7112C15.4728 18.7112 15.0312 18.6874 14.6372 18.6636V17.4306C14.9836 17.4782 15.4252 17.5021 15.9948 17.5021C16.6572 17.5021 17.3672 17.4544 17.922 17.383ZM17.922 16.2691V17.3116C17.3672 17.383 16.6572 17.4306 15.9948 17.4306C15.4252 17.4306 14.9836 17.4068 14.6372 17.3592V16.2691H17.922ZM17.922 16.1976H14.6372V15.1313C14.9836 15.0837 15.4728 15.0599 15.9948 15.0599C16.6572 15.0599 17.3672 15.1075 17.922 15.179V16.1976ZM19.8756 14.2984C19.0852 14.1317 17.5868 13.9888 15.9948 13.9888C14.4028 13.9888 12.9044 14.1317 12.114 14.2984V12.0878H19.8756V14.2984ZM20.9356 12.0878V14.3222C20.9356 15.8456 17.9696 15.9647 15.9948 15.9647C14.02 15.9647 11.054 15.8456 11.054 14.3222V12.0878H9.5V19.9123H11.054V19.8885C11.054 18.3651 14.02 18.246 15.9948 18.246C17.9696 18.246 20.9356 18.3651 20.9356 19.8885V19.9123H22.4896V12.0878H20.9356Z"
            fill="white"
          />
        </svg>
      ),
      color: "#26A17B",
    },
    {
      id: "usdc",
      name: "USD Coin",
      symbol: "USDC",
      balance: "425.50",
      fiatValue: "$425.50",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="#2775CA"
          />
          <path
            d="M16 6.5C10.7 6.5 6.5 10.7 6.5 16C6.5 21.3 10.7 25.5 16 25.5C21.3 25.5 25.5 21.3 25.5 16C25.5 10.7 21.3 6.5 16 6.5ZM16 23.8C11.6 23.8 8.2 20.4 8.2 16C8.2 11.6 11.6 8.2 16 8.2C20.4 8.2 23.8 11.6 23.8 16C23.8 20.4 20.4 23.8 16 23.8Z"
            fill="white"
          />
          <path
            d="M16.7 13.9V12.3H19.4V10.6H16.7V9H15V10.6H13.8C12.3 10.6 11.1 11.8 11.1 13.3C11.1 14.8 12.3 16 13.8 16H15V19.4H13.8C13.1 19.4 12.6 18.9 12.6 18.2C12.6 17.5 13.1 17 13.8 17H15V15.3H12.3V13.6H15V12H16.7V13.6H17.9C19.4 13.6 20.6 12.4 20.6 10.9C20.6 9.4 19.4 8.2 17.9 8.2H16.7V9.8H17.9C18.6 9.8 19.1 10.3 19.1 11C19.1 11.7 18.6 12.2 17.9 12.2H16.7V13.9ZM13.8 14.3C13.1 14.3 12.6 13.8 12.6 13.1C12.6 12.4 13.1 11.9 13.8 11.9H15V14.3H13.8ZM16.7 18.1V20.7H15V19.1H13.8C12.3 19.1 11.1 20.3 11.1 21.8C11.1 23.3 12.3 24.5 13.8 24.5H16.7C18.2 24.5 19.4 23.3 19.4 21.8V18.1H16.7ZM17.9 21.8C17.9 22.5 17.4 23 16.7 23H13.8C13.1 23 12.6 22.5 12.6 21.8C12.6 21.1 13.1 20.6 13.8 20.6H17.9V21.8Z"
            fill="white"
          />
        </svg>
      ),
      color: "#2775CA",
    },
    {
      id: "cusd",
      name: "Celo Dollar",
      symbol: "cUSD",
      balance: "210.25",
      fiatValue: "$210.25",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="#35D07F"
          />
          <path
            d="M16 7.5C11.3 7.5 7.5 11.3 7.5 16C7.5 20.7 11.3 24.5 16 24.5C20.7 24.5 24.5 20.7 24.5 16C24.5 11.3 20.7 7.5 16 7.5ZM16 22.5C12.4 22.5 9.5 19.6 9.5 16C9.5 12.4 12.4 9.5 16 9.5C19.6 9.5 22.5 12.4 22.5 16C22.5 19.6 19.6 22.5 16 22.5Z"
            fill="white"
          />
          <path d="M16.5 12.5H15.5V16.5H19.5V15.5H16.5V12.5Z" fill="white" />
        </svg>
      ),
      color: "#35D07F",
    },
    {
      id: "celo",
      name: "Celo",
      symbol: "CELO",
      balance: "45.75",
      fiatValue: "$68.63",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32Z"
            fill="#FBCC5C"
          />
          <path
            d="M16 6.5C10.7 6.5 6.5 10.7 6.5 16C6.5 21.3 10.7 25.5 16 25.5C21.3 25.5 25.5 21.3 25.5 16C25.5 10.7 21.3 6.5 16 6.5ZM16 23.8C11.6 23.8 8.2 20.4 8.2 16C8.2 11.6 11.6 8.2 16 8.2C20.4 8.2 23.8 11.6 23.8 16C23.8 20.4 20.4 23.8 16 23.8Z"
            fill="white"
          />
          <path
            d="M16 10.5C13 10.5 10.5 13 10.5 16C10.5 19 13 21.5 16 21.5C19 21.5 21.5 19 21.5 16C21.5 13 19 10.5 16 10.5ZM16 19.8C14 19.8 12.2 18.1 12.2 16C12.2 14 14 12.2 16 12.2C18 12.2 19.8 14 19.8 16C19.8 18.1 18 19.8 16 19.8Z"
            fill="white"
          />
        </svg>
      ),
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
                  className="flex items-center justify-center h-12 space-x-2 bg-gray-200 hover:bg-gray-300 text-black rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path
                      d="M21.0477 3.05293C18.8697 0.707363 2.48648 6.4532 2.50001 8.551C2.51535 10.9299 8.89809 11.6617 10.6672 12.1581C11.7311 12.4565 12.016 12.7625 12.2613 13.8781C13.3723 18.9305 13.9301 21.4435 15.2014 21.4996C17.2278 21.5892 23.1733 5.342 21.0477 3.05293Z"
                      stroke="black"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11.5 12.5L15 9"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>Send</span>
                </Button>
                <Button
                  onClick={() => setReceiveOpen(true)}
                  className="flex items-center justify-center h-12 space-x-2 bg-black hover:bg-black/80 text-white rounded-md"
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
                  className="flex items-center justify-center h-12 space-x-2 bg-green-600 hover:bg-green-700 text-white rounded-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                    <path
                      d="M5.5 3.5L5.5 14.5C5.5 18.2133 8.18503 21 12 21"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.5 20.5L18.5 9.5C18.5 5.78672 15.815 3 12 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M21 18C21 18 19.1588 20.5 18.5 20.5C17.8412 20.5 16 18 16 18"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 5.50022C8 5.50022 6.15878 3.00025 5.49998 3.00024C4.84118 3.00024 3 5.50024 3 5.50024"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
  )
}

