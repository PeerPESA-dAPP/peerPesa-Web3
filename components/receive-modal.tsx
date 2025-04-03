"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/hooks/use-toast"

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  icon: React.ReactNode
  color: string
}

interface ReceiveModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cryptoCurrencies: CryptoCurrency[]
}

export default function ReceiveModal({ open, onOpenChange, cryptoCurrencies }: ReceiveModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [fiatAmount, setFiatAmount] = useState("")
  const [fiatCurrency, setFiatCurrency] = useState("UGX")
  const [toCryptoId, setToCryptoId] = useState(cryptoCurrencies[0].id)
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Mock exchange rates (inverse of send rates)
  const rates = {
    "UGX-eth": 1 / 6500000,
    "UGX-btc": 1 / 130000000,
    "UGX-usdt": 1 / 3700,
    "UGX-sol": 1 / 100000,
  }

  const getSelectedCrypto = () => {
    return cryptoCurrencies.find((c) => c.id === toCryptoId) || cryptoCurrencies[0]
  }

  const getRateForPair = (from: string, to: string) => {
    const key = `${from}-${to}`
    return rates[key as keyof typeof rates] || 1
  }

  const getExpectedCryptoAmount = () => {
    if (!fiatAmount || isNaN(Number.parseFloat(fiatAmount))) return "0"
    const rate = getRateForPair(fiatCurrency, toCryptoId)
    return (Number.parseFloat(fiatAmount) * rate).toFixed(8)
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process transaction
      setIsLoading(true)
      setTimeout(() => {
        setIsLoading(false)
        setIsComplete(true)

        // Reset and close after showing success
        setTimeout(() => {
          resetForm()
          onOpenChange(false)
        }, 2000)
      }, 2000)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    } else {
      resetForm()
      onOpenChange(false)
    }
  }

  const resetForm = () => {
    setStep(1)
    setFiatAmount("")
    setFiatCurrency("UGX")
    setToCryptoId(cryptoCurrencies[0].id)
    setPaymentMethod("Mobile Money")
    setAccountName("")
    setAccountNumber("")
    setIsComplete(false)
  }

  const isNextDisabled = () => {
    if (step === 1) {
      return !fiatAmount || Number.parseFloat(fiatAmount) <= 0 || !fiatCurrency || !toCryptoId
    }
    if (step === 2) {
      return !accountName || !accountNumber || !paymentMethod
    }
    return false
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
          <DialogTitle>{isComplete ? "Request Complete" : `Receive Crypto - Step ${step} of 3`}</DialogTitle>
          <DialogDescription>
            {isComplete
              ? "Your request has been successfully created."
              : step === 1
                ? "Enter the amount you want to receive."
                : step === 2
                  ? "Enter your payment details."
                  : "Review your request details."}
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center">
              You have successfully requested {fiatAmount} {fiatCurrency}({getExpectedCryptoAmount()}{" "}
              {getSelectedCrypto().symbol}) from {accountName}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center">Processing your request...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="fiat-amount">Amount ({fiatCurrency})</Label>
                  <Input
                    id="fiat-amount"
                    type="number"
                    placeholder="0"
                    min="1000"
                    value={fiatAmount}
                    onChange={(e) => setFiatAmount(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="fiat-currency">Fiat Currency</Label>
                  <Select value={fiatCurrency} onValueChange={setFiatCurrency}>
                    <SelectTrigger id="fiat-currency">
                      <SelectValue placeholder="Select fiat currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UGX">UGX (Ugandan Shilling)</SelectItem>
                      <SelectItem value="KES">KES (Kenyan Shilling)</SelectItem>
                      <SelectItem value="USD">USD (US Dollar)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="to-crypto">Receive in (Cryptocurrency)</Label>
                  <Select value={toCryptoId} onValueChange={setToCryptoId}>
                    <SelectTrigger id="to-crypto">
                      <SelectValue placeholder="Select cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      {cryptoCurrencies.map((crypto) => (
                        <SelectItem key={crypto.id} value={crypto.id}>
                          <div className="flex items-center">
                            <div className="mr-2">{crypto.icon}</div>
                            <span>
                              {crypto.name} ({crypto.symbol})
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm">
                  <p className="font-medium">You will receive approximately:</p>
                  <p className="text-lg font-bold text-primary">
                    {getExpectedCryptoAmount()} {getSelectedCrypto().symbol}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Rate: 1 {fiatCurrency} = {getRateForPair(fiatCurrency, toCryptoId)} {getSelectedCrypto().symbol}
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mobile Money" id="r-mobile-money" />
                      <Label htmlFor="r-mobile-money">Mobile Money</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Bank" id="r-bank" />
                      <Label htmlFor="r-bank">Bank</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="r-account-name">Account Name</Label>
                  <Input
                    id="r-account-name"
                    placeholder="Enter your name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="r-account-number">Account Number</Label>
                  <Input
                    id="r-account-number"
                    placeholder={paymentMethod === "Mobile Money" ? "Enter phone number" : "Enter account number"}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 py-4">
                <div className="rounded-lg border p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">Amount:</div>
                    <div className="font-medium">
                      {fiatAmount} {fiatCurrency}
                    </div>

                    <div className="text-muted-foreground">You Receive:</div>
                    <div className="font-medium">
                      {getExpectedCryptoAmount()} {getSelectedCrypto().symbol}
                    </div>

                    <div className="text-muted-foreground">Payment Method:</div>
                    <div className="font-medium">{paymentMethod}</div>

                    <div className="text-muted-foreground">Account Name:</div>
                    <div className="font-medium">{accountName}</div>

                    <div className="text-muted-foreground">Account Number:</div>
                    <div className="font-medium">{accountNumber}</div>

                    <div className="text-muted-foreground">Fee:</div>
                    <div className="font-medium">1,000 {fiatCurrency}</div>

                    <div className="text-muted-foreground">Total to Pay:</div>
                    <div className="font-medium">
                      {(Number.parseFloat(fiatAmount) + 1000).toLocaleString()} {fiatCurrency}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <DialogFooter className="flex flex-row justify-between sm:justify-between">
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {step === 1 ? "Cancel" : "Back"}
              </Button>
              <Button
                type="button"
                onClick={handleNext}
                disabled={isNextDisabled()}
                className="bg-primary hover:bg-primary/90"
              >
                {step === 3 ? "Confirm" : "Next"}
                {step !== 3 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

