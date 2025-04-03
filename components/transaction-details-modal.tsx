"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface Transaction {
  id: string
  type: "sent" | "received" | "swap"
  amount: string
  cryptoAmount?: string
  cryptoCurrency?: string
  fiatAmount?: string
  fiatCurrency?: string
  address: string
  accountName?: string
  accountNumber?: string
  paymentMethod?: string
  timestamp: string
  status: "completed" | "pending" | "failed"
}

interface TransactionDetailsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction: Transaction | null
}

export default function TransactionDetailsModal({ open, onOpenChange, transaction }: TransactionDetailsModalProps) {
  if (!transaction) return null

  const getStatusBadge = () => {
    switch (transaction.status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Failed</Badge>
      default:
        return null
    }
  }

  // Update the getTransactionIcon function to use the new icons
  const getTransactionIcon = () => {
    switch (transaction.type) {
      case "sent":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-red-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        )
      case "received":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        )
      case "swap":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-blue-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 16V4M7 4L3 8M7 4l4 4" />
            <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
          </svg>
        )
      default:
        return null
    }
  }

  const getTransactionTitle = () => {
    switch (transaction.type) {
      case "sent":
        return "Sent"
      case "received":
        return "Received"
      case "swap":
        return "Swapped"
      default:
        return "Transaction"
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div
              className={`rounded-full p-2 ${
                transaction.type === "sent"
                  ? "bg-red-100"
                  : transaction.type === "received"
                    ? "bg-green-100"
                    : "bg-blue-100"
              }`}
            >
              {getTransactionIcon()}
            </div>
            <span>
              {getTransactionTitle()} {transaction.cryptoCurrency || "USDT"}
            </span>
            <div className="ml-auto">{getStatusBadge()}</div>
          </DialogTitle>
          <DialogDescription>Transaction ID: {transaction.id}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-muted-foreground">Type:</div>
              <div className="font-medium capitalize">{transaction.type}</div>

              <div className="text-muted-foreground">Amount:</div>
              <div className="font-medium">
                {transaction.cryptoAmount} {transaction.cryptoCurrency || "USDT"}
              </div>

              {transaction.fiatAmount && (
                <>
                  <div className="text-muted-foreground">Fiat Value:</div>
                  <div className="font-medium">
                    {transaction.fiatAmount} {transaction.fiatCurrency}
                  </div>
                </>
              )}

              <div className="text-muted-foreground">Date:</div>
              <div className="font-medium">{transaction.timestamp}</div>

              <div className="text-muted-foreground">Status:</div>
              <div className="font-medium capitalize">{transaction.status}</div>
            </div>
          </div>

          {(transaction.type === "sent" || transaction.type === "received") && (
            <>
              <Separator />

              <div className="space-y-2">
                <h3 className="text-sm font-medium">{transaction.type === "sent" ? "Recipient" : "Sender"} Details</h3>
                <div className="rounded-lg border p-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {transaction.accountName && (
                      <>
                        <div className="text-muted-foreground">Name:</div>
                        <div className="font-medium">{transaction.accountName}</div>
                      </>
                    )}

                    {transaction.accountNumber && (
                      <>
                        <div className="text-muted-foreground">
                          {transaction.paymentMethod === "Mobile Money" ? "Phone Number:" : "Account Number:"}
                        </div>
                        <div className="font-medium">{transaction.accountNumber}</div>
                      </>
                    )}

                    {transaction.paymentMethod && (
                      <>
                        <div className="text-muted-foreground">Payment Method:</div>
                        <div className="font-medium">{transaction.paymentMethod}</div>
                      </>
                    )}

                    <div className="text-muted-foreground">Wallet Address:</div>
                    <div className="font-medium">{transaction.address}</div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="pt-2">
            <Button variant="outline" className="w-full" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

