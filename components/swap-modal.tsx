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

// Add validation constants
const VALIDATION = {
  MIN_AMOUNT: 0.001,
  MAX_AMOUNT: 1000000,
}

export default function SwapModal({ open, onOpenChange, cryptoCurrencies, onSuccess }: SwapModalProps) {
  const [fromCryptoId, setFromCryptoId] = useState(cryptoCurrencies[0]?.id ?? "")
  const [toCryptoId, setToCryptoId] = useState(cryptoCurrencies[1]?.id ?? "")
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [errors, setErrors] = useState<{
    fromAmount?: string
    toAmount?: string
  }>({})

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

  // Add validation functions
  const validateFromAmount = (value: string) => {
    const numValue = Number.parseFloat(value)
    const fromCrypto = cryptoCurrencies.find(c => c.id === fromCryptoId)
    const balance = Number.parseFloat(fromCrypto?.balance || "0")

    if (isNaN(numValue) || numValue <= 0) {
      return "Amount must be greater than 0"
    }
    if (numValue < VALIDATION.MIN_AMOUNT) {
      return `Minimum amount is ${VALIDATION.MIN_AMOUNT} ${fromCrypto?.symbol}`
    }
    if (numValue > VALIDATION.MAX_AMOUNT) {
      return `Maximum amount is ${VALIDATION.MAX_AMOUNT} ${fromCrypto?.symbol}`
    }
    if (numValue > balance) {
      return `Insufficient balance. Available: ${balance} ${fromCrypto?.symbol}`
    }
    return undefined
  }

  const validateToAmount = (value: string) => {
    const numValue = Number.parseFloat(value)
    const toCrypto = cryptoCurrencies.find(c => c.id === toCryptoId)

    if (isNaN(numValue) || numValue <= 0) {
      return "Amount must be greater than 0"
    }
    if (numValue < VALIDATION.MIN_AMOUNT) {
      return `Minimum amount is ${VALIDATION.MIN_AMOUNT} ${toCrypto?.symbol}`
    }
    if (numValue > VALIDATION.MAX_AMOUNT) {
      return `Maximum amount is ${VALIDATION.MAX_AMOUNT} ${toCrypto?.symbol}`
    }
    return undefined
  }

  // Update amount change handlers
  const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setFromAmount(value)
    const error = validateFromAmount(value)
    setErrors(prev => ({ ...prev, fromAmount: error }))

    // Update to amount based on rate
    if (value && !error) {
      const rate = getRateForPair(fromCryptoId, toCryptoId)
      const newToAmount = (Number.parseFloat(value) * rate).toFixed(6)
      setToAmount(newToAmount)
      setErrors(prev => ({ ...prev, toAmount: validateToAmount(newToAmount) }))
    } else {
      setToAmount("")
    }
  }

  const handleToAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setToAmount(value)
    const error = validateToAmount(value)
    setErrors(prev => ({ ...prev, toAmount: error }))

    // Update from amount based on rate
    if (value && !error) {
      const rate = getRateForPair(toCryptoId, fromCryptoId)
      const newFromAmount = (Number.parseFloat(value) * rate).toFixed(6)
      setFromAmount(newFromAmount)
      setErrors(prev => ({ ...prev, fromAmount: validateFromAmount(newFromAmount) }))
    } else {
      setFromAmount("")
    }
  }

  // Update crypto selection handlers
  const handleFromCryptoChange = (value: string) => {
    setFromCryptoId(value)
    // Revalidate amounts when crypto changes
    if (fromAmount) {
      const error = validateFromAmount(fromAmount)
      setErrors(prev => ({ ...prev, fromAmount: error }))
    }
    if (toAmount) {
      const error = validateToAmount(toAmount)
      setErrors(prev => ({ ...prev, toAmount: error }))
    }
  }

  const handleToCryptoChange = (value: string) => {
    setToCryptoId(value)
    // Revalidate amounts when crypto changes
    if (fromAmount) {
      const error = validateFromAmount(fromAmount)
      setErrors(prev => ({ ...prev, fromAmount: error }))
    }
    if (toAmount) {
      const error = validateToAmount(toAmount)
      setErrors(prev => ({ ...prev, toAmount: error }))
    }
  }

  // Update handleSwapTokens to use proper event handling
  const handleSwapTokens = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const temp = fromCryptoId
    setFromCryptoId(toCryptoId)
    setToCryptoId(temp)

    // Revalidate amounts after swap
    if (fromAmount) {
      const error = validateFromAmount(fromAmount)
      setErrors(prev => ({ ...prev, fromAmount: error }))
    }
    if (toAmount) {
      const error = validateToAmount(toAmount)
      setErrors(prev => ({ ...prev, toAmount: error }))
    }
  }

  // Update resetForm
  const resetForm = () => {
    setFromAmount("")
    setToAmount("")
    setIsComplete(false)
    setErrors({})
  }

  // Update isSwapDisabled
  const isSwapDisabled = () => {
    return !fromAmount || !toAmount || 
           !!errors.fromAmount || !!errors.toAmount ||
           Number.parseFloat(fromAmount) <= 0 || Number.parseFloat(toAmount) <= 0
  }

  const getRateForPair = (from: string, to: string) => {
    const key = `${from}-${to}`
    return rates[key] || 1
  }

  // Update handleSwap to use proper event handling
  const handleSwap = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
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
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>From</Label>
              <Select value={fromCryptoId} onValueChange={handleFromCryptoChange}>
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
              <div className="grid gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  step="0.001"
                  min={VALIDATION.MIN_AMOUNT}
                  value={fromAmount}
                  onChange={handleFromAmountChange}
                  className={errors.fromAmount ? "border-destructive" : ""}
                />
                {errors.fromAmount && (
                  <p className="text-sm text-destructive">{errors.fromAmount}</p>
                )}
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="mx-auto"
              onClick={handleSwapTokens}
            >
              <ArrowDown className="h-4 w-4" />
            </Button>

            <div className="grid gap-2">
              <Label>To</Label>
              <Select value={toCryptoId} onValueChange={handleToCryptoChange}>
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
              <div className="grid gap-2">
                <Input
                  type="number"
                  placeholder="0.0"
                  step="0.001"
                  min={VALIDATION.MIN_AMOUNT}
                  value={toAmount}
                  onChange={handleToAmountChange}
                  className={errors.toAmount ? "border-destructive" : ""}
                />
                {errors.toAmount && (
                  <p className="text-sm text-destructive">{errors.toAmount}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Exchange Rate</span>
              <span>
                1 {getFromCrypto()?.symbol} = {getRateForPair(fromCryptoId, toCryptoId)} {getToCrypto()?.symbol}
              </span>
            </div>
          </div>
        )}

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
      </DialogContent>
    </Dialog>
  )
}
