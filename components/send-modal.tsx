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

interface CryptoCurrency {
  id: string
  name: string
  symbol: string
  balance: string
  fiatValue: string
  icon: React.ReactNode
  color: string
}

interface SendModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cryptoCurrencies: CryptoCurrency[]
  selectedCrypto: CryptoCurrency
  onSuccess: (cryptoId: string, amount: string) => void
}

export default function SendModal({ open, onOpenChange, cryptoCurrencies, selectedCrypto, onSuccess }: SendModalProps) {
  const [step, setStep] = useState(1)
  const [fromCryptoId, setFromCryptoId] = useState(selectedCrypto.id)
  const [toFiat, setToFiat] = useState("UGX")
  const [paymentMethod, setPaymentMethod] = useState("Mobile Money")
  const [accountName, setAccountName] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [amount, setAmount] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  // Mock exchange rates
  const rates = {
    "eth-UGX": 6500000,
    "btc-UGX": 130000000,
    "usdt-UGX": 3700,
    "sol-UGX": 100000,
  }

  const getSelectedCrypto = () => {
    return cryptoCurrencies.find((c) => c.id === fromCryptoId) || selectedCrypto
  }

  const getRateForPair = (from: string, to: string) => {
    const key = `${from}-${to}`
    return rates[key as keyof typeof rates] || 1
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
        onSuccess(fromCryptoId, amount)

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
    setFromCryptoId(selectedCrypto.id)
    setToFiat("UGX")
    setPaymentMethod("Mobile Money")
    setAccountName("")
    setAccountNumber("")
    setAmount("")
    setIsComplete(false)
  }

  const isNextDisabled = () => {
    if (step === 1) {
      return !fromCryptoId || !toFiat || !paymentMethod || !amount || Number.parseFloat(amount) <= 0
    }
    if (step === 2) {
      return !accountName || !accountNumber
    }
    return false
  }

  const getExpectedFiatAmount = () => {
    if (!amount || isNaN(Number.parseFloat(amount))) return "0"
    const rate = getRateForPair(fromCryptoId, toFiat)
    return (Number.parseFloat(amount) * rate).toLocaleString()
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
          <DialogTitle>{isComplete ? "Transaction Complete" : `Send Crypto - Step ${step} of 3`}</DialogTitle>
          <DialogDescription>
            {isComplete
              ? "Your transaction has been successfully processed."
              : step === 1
                ? "Select the cryptocurrency to send and payment method."
                : step === 2
                  ? "Enter the recipient's account details."
                  : "Review your transaction details."}
          </DialogDescription>
        </DialogHeader>

        {isComplete ? (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="rounded-full bg-green-100 p-3 mb-4">
              <Check className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-center">
              You have successfully sent {amount} {getSelectedCrypto().symbol}({getExpectedFiatAmount()} {toFiat}) to{" "}
              {accountName}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-center">Processing your transaction...</p>
          </div>
        ) : (
          <>
            {step === 1 && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="from-crypto">From (Cryptocurrency)</Label>
                  <Select value={fromCryptoId} onValueChange={setFromCryptoId}>
                    <SelectTrigger id="from-crypto">
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
                  <p className="text-sm text-muted-foreground">
                    Available: {getSelectedCrypto().balance} {getSelectedCrypto().symbol}
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="to-fiat">To (Fiat Currency)</Label>
                  <Select value={toFiat} onValueChange={setToFiat}>
                    <SelectTrigger id="to-fiat">
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
                  <Label htmlFor="amount">Amount ({getSelectedCrypto().symbol})</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.0"
                    step="0.001"
                    min="0.001"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <p className="text-sm text-muted-foreground">
                    ≈ {getExpectedFiatAmount()} {toFiat}
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label>Payment Method</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Mobile Money" id="mobile-money" />
                      <Label htmlFor="mobile-money">Mobile Money</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Bank" id="bank" />
                      <Label htmlFor="bank">Bank</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input
                    id="account-name"
                    placeholder="Enter recipient's name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder={paymentMethod === "Mobile Money" ? "Enter phone number" : "Enter account number"}
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Payment Method: {paymentMethod}</p>
                  <p>Make sure the account details are correct before proceeding.</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 py-4">
                <div className="rounded-lg border p-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-muted-foreground">From:</div>
                    <div className="font-medium">
                      {getSelectedCrypto().name} ({getSelectedCrypto().symbol})
                    </div>

                    <div className="text-muted-foreground">To:</div>
                    <div className="font-medium">{toFiat}</div>

                    <div className="text-muted-foreground">Amount:</div>
                    <div className="font-medium">
                      {amount} {getSelectedCrypto().symbol}
                    </div>

                    <div className="text-muted-foreground">Recipient gets:</div>
                    <div className="font-medium">
                      {getExpectedFiatAmount()} {toFiat}
                    </div>

                    <div className="text-muted-foreground">Payment Method:</div>
                    <div className="font-medium">{paymentMethod}</div>

                    <div className="text-muted-foreground">Account Name:</div>
                    <div className="font-medium">{accountName}</div>

                    <div className="text-muted-foreground">Account Number:</div>
                    <div className="font-medium">{accountNumber}</div>

                    <div className="text-muted-foreground">Fee:</div>
                    <div className="font-medium">0.0005 {getSelectedCrypto().symbol}</div>

                    <div className="text-muted-foreground">Total:</div>
                    <div className="font-medium">
                      {(Number.parseFloat(amount) + 0.0005).toFixed(4)} {getSelectedCrypto().symbol}
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

