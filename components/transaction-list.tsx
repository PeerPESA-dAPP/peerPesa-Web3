"use client"

import { useState } from "react"
import TransactionDetailsModal from "./transaction-details-modal"

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

interface TransactionListProps {
  type?: "sent" | "received"
}

export default function TransactionList({ type }: TransactionListProps) {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)

  // Mock transaction data - updated with new cryptocurrencies
  const transactions: Transaction[] = [
    {
      id: "tx1",
      type: "sent",
      amount: "25.5",
      cryptoAmount: "25.5",
      cryptoCurrency: "USDT",
      fiatAmount: "25.5",
      fiatCurrency: "USD",
      address: "0x1a2...3b4c",
      accountName: "John Doe",
      accountNumber: "256701234567",
      paymentMethod: "Mobile Money",
      timestamp: "2 hours ago",
      status: "completed",
    },
    {
      id: "tx2",
      type: "received",
      amount: "50",
      cryptoAmount: "50",
      cryptoCurrency: "USDC",
      fiatAmount: "50",
      fiatCurrency: "USD",
      address: "0x5d6...7e8f",
      accountName: "Sarah Smith",
      accountNumber: "256789012345",
      paymentMethod: "Bank",
      timestamp: "Yesterday",
      status: "completed",
    },
    {
      id: "tx3",
      type: "sent",
      amount: "15.75",
      cryptoAmount: "15.75",
      cryptoCurrency: "cUSD",
      fiatAmount: "15.75",
      fiatCurrency: "USD",
      address: "0x9a0...1b2c",
      accountName: "Michael Johnson",
      accountNumber: "256712345678",
      paymentMethod: "Mobile Money",
      timestamp: "2 days ago",
      status: "completed",
    },
    {
      id: "tx4",
      type: "swap",
      amount: "20",
      cryptoAmount: "20",
      cryptoCurrency: "USDT",
      fiatAmount: "30",
      fiatCurrency: "CELO",
      address: "USDT → CELO",
      timestamp: "3 days ago",
      status: "completed",
    },
    {
      id: "tx5",
      type: "received",
      amount: "33",
      cryptoAmount: "33",
      cryptoCurrency: "CELO",
      fiatAmount: "49.5",
      fiatCurrency: "USD",
      address: "0x3d4...5e6f",
      accountName: "Emily Wilson",
      accountNumber: "256798765432",
      paymentMethod: "Mobile Money",
      timestamp: "5 days ago",
      status: "completed",
    },
  ]

  // Filter transactions based on type prop
  const filteredTransactions = type ? transactions.filter((tx) => tx.type === type) : transactions

  const handleTransactionClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
    setDetailsOpen(true)
  }

  if (filteredTransactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
        <p>No transactions found</p>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex items-center justify-between rounded-lg border p-4 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => handleTransactionClick(tx)}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-2 ${
                  tx.type === "sent" ? "bg-red-100" : tx.type === "received" ? "bg-green-100" : "bg-blue-100"
                }`}
              >
                {tx.type === "sent" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    className={tx.type === "sent" ? "text-red-600" : ""}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 19V5M5 12l7-7 7 7" />
                  </svg>
                ) : tx.type === "received" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    className={tx.type === "received" ? "text-green-600" : ""}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    className={tx.type === "swap" ? "text-blue-600" : ""}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 16V4M7 4L3 8M7 4l4 4" />
                    <path d="M17 8v12M17 20l4-4M17 20l-4-4" />
                  </svg>
                )}
              </div>
              <div>
                <div className="font-medium text-secondary">
                  {tx.type === "sent" ? "Sent" : tx.type === "received" ? "Received" : "Swapped"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {tx.type !== "swap" ? tx.accountName || tx.address : tx.address}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div
                className={`font-medium ${
                  tx.type === "sent" ? "text-red-600" : tx.type === "received" ? "text-primary" : ""
                }`}
              >
                {tx.type === "sent" ? "-" : tx.type === "received" ? "+" : ""}
                {tx.amount} {tx.cryptoCurrency || "USDT"}
              </div>
              <div className="text-xs text-muted-foreground">{tx.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      <TransactionDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} transaction={selectedTransaction} />
    </>
  )
}
