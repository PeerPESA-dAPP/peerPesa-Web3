"use client"

import type React from "react"

import { Card, CardContent } from "@/components/ui/card"

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  icon: React.ReactNode
  color: string
  price: any
}

interface CryptoBalanceCardProps {
  crypto: CryptoCurrency
  isSelected: boolean
  onClick: () => void
  yellowCardRates: any
  defaultCurrency: string
}

// Make sure the crypto balance cards are optimized for mobile view
export default function CryptoBalanceCard({ crypto, isSelected, onClick, yellowCardRates, defaultCurrency }: CryptoBalanceCardProps) {
 return (
    <Card
      className={`cursor-pointer transition-all hover:shadow-md ${
        isSelected ? "border-primary border-2" : "border border-gray-200"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="mr-3">{crypto.icon}</div>
            <div>
              <h3 className="font-medium text-secondary">{crypto.name}</h3>
              <p className="text-sm text-gray-500">{crypto.symbol}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold text-secondary">Buy : {( (Number(crypto?.price?.amount) < Number(yellowCardRates?.sell)) && !isNaN(Number(yellowCardRates?.sell)))?  Number(1 /  yellowCardRates?.sell).toFixed(4):Number(1 / crypto?.price?.amount).toFixed(4)} {crypto?.price?.quote_coin ?? defaultCurrency} </p>
            <p className="text-sm text-gray-500">Sell: {( (Number(crypto?.price?.amount) < Number(yellowCardRates?.sell)) && !isNaN(Number(yellowCardRates?.sell)))?  Number(1 /  yellowCardRates?.sell).toFixed(4):Number(1 / crypto?.price?.amount).toFixed(4)} {crypto?.price?.quote_coin ?? defaultCurrency}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
