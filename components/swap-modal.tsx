"use client"

import type React from "react"

import { useState } from "react"
import { ArrowDown, Check, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  icon: React.ReactNode
  color: string
}

interface SwapModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cryptoCurrencies: CryptoCurrency[]
  onSuccess: (fromCryptoId: string, toCryptoId: string, fromAmount: string, toAmount: string) => void
}

export default function SwapModal({ open, onOpenChange, cryptoCurrencies, onSuccess }: SwapModalProps) {
  const [fromCryptoId, setFromCryptoId] = useState(cryptoCurrencies[0].id)
  const [toCryptoId, setToCryptoId] = useState(cryptoCurrencies[1].id)
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Mock exchange rates - updated for the new cryptocurrencies
  const rates: Record<string, number> = {
    "usdt-usdc": 1,
    "usdc-usdt": 1,
    "usdt-cusd": 1,
    "cusd-usdt": 1,
    "usdc-cusd": 1,
    "cusd-usdc": 1,
    "usdt-celo": 0.67,
    "celo-usdt": 1.5,
    "usdc-celo": 0.67,
    "celo-usdc": 1.5,
    "cusd-celo": 0.67,
    "celo-cusd": 1.5,
  }

  const getFromCrypto = () => {
    return cryptoCurrencies.find((c) => c.id === fromCryptoId) || cryptoCurrencies[0]
  }

  const getToCrypto = () => {
    return cryptoCurrencies.find((c) => c.id === toCryptoId) || cryptoCurrencies[1]
  }

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value)
    const rate = getRateForPair(fromCryptoId, toCryptoId)
    if (value && !isNaN(Number.parseFloat(value))) {
      setToAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (value: string) => {
    setToAmount(value)
    const rate = 1 / getRateForPair(fromCryptoId, toCryptoId)
    if (value && !isNaN(Number.parseFloat(value))) {
      setFromAmount((Number.parseFloat(value) * rate).toFixed(6))
    } else {
      setFromAmount("")
    }
  }

  const getRateForPair = (from: string, to: string) => {
    const key = `${from}-${to}`
    return rates[key] || 1
  }

  const handleSwapTokens = () => {
    const temp = fromCryptoId
    setFromCryptoId(toCryptoId)
    setToCryptoId(temp)

    // Recalculate amounts
    if (fromAmount) {
      const rate = getRateForPair(toCryptoId, fromCryptoId)
      setToAmount((Number.parseFloat(fromAmount) * rate).toFixed(6))
    }
  }

  const handleSwap = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsComplete(true)

      onSuccess(fromCryptoId, toCryptoId, fromAmount, toAmount)

      // Reset and close after showing success
      setTimeout(() => {
        resetForm()
        onOpenChange(false)
      }, 2000)
    }, 2000)
  }

  const resetForm = () => {
    setFromAmount("")
    setToAmount("")
    setIsComplete(false)
  }

  const isSwapDisabled = () => {
    return !fromAmount || Number.parseFloat(fromAmount) <= 0 || !toAmount || Number.parseFloat(toAmount) <= 0
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!open) resetForm()
        onOpenChange(open)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isComplete ? "Swap Complete" : "Swap Tokens"}</DialogTitle>
          <DialogDescription>
            {isComplete
              ? "Your swap has been successfully processed."
              : "Exchange one token for another at the current market rate."}
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center">
              You have successfully swapped {fromAmount} {getFromCrypto().symbol} for {toAmount} {getToCrypto().symbol}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center">Processing your swap...</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label>From</Label>
                <div className="flex gap-2">
                  <Select value={fromCryptoId} onValueChange={setFromCryptoId}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoCurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id} disabled={crypto.id === toCryptoId}>
                          <div className="flex items-center">
                            <div className="mr-2">{crypto.icon}</div>
                            <span>{crypto.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => handleFromAmountChange(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Available: {getFromCrypto().balance} {getFromCrypto().symbol}
                </p>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="icon" onClick={handleSwapTokens} className="rounded-full">
                  <ArrowDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label>To</Label>
                <div className="flex gap-2">
                  <Select value={toCryptoId} onValueChange={setToCryptoId}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoCurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id} disabled={crypto.id === fromCryptoId}>
                          <div className="flex items-center">
                            <div className="mr-2">{crypto.icon}</div>
                            <span>{crypto.symbol}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="0.0"
                    value={toAmount}
                    onChange={(e) => handleToAmountChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Exchange Rate</span>
                <span>
                  1 {getFromCrypto().symbol} = {getRateForPair(fromCryptoId, toCryptoId)} {getToCrypto().symbol}
                </span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                onClick={handleSwap}
                disabled={isSwapDisabled()}
                className="w-full bg-primary hover:bg-primary/90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" className="mr-2">
                  <path
                    d="M16.9767 19.5C19.4017 17.8876 21 15.1305 21 12C21 7.02944 16.9706 3 12 3C11.3126 3 10.6432 3.07706 10 3.22302M16.9767 19.5V16M16.9767 19.5H20.5M7 4.51555C4.58803 6.13007 3 8.87958 3 12C3 16.9706 7.02944 21 12 21C12.6874 21 13.3568 20.9229 14 20.777M7 4.51555V8M7 4.51555H3.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Swap
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
