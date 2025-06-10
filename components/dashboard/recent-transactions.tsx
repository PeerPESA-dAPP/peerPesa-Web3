
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, RefreshCw } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw" | "swap";
  asset: string;
  amount: string;
  fiatValue: string;
  date: string;
  status: "completed" | "pending" | "failed";
}

const transactions: Transaction[] = [
  {
    id: "tx1",
    type: "deposit",
    asset: "CELO",
    amount: "", // +15.45
    fiatValue: "$134.56",
    date: "Today, 10:24 AM",
    status: "completed",
  },
  // {
  //   id: "tx2",
  //   type: "withdraw",
  //   asset: "XLM",
  //   amount: "-125.30",
  //   fiatValue: "$290.25",
  //   date: "Yesterday, 3:45 PM",
  //   status: "completed",
  // },
  // {
  //   id: "tx3",
  //   type: "swap",
  //   asset: "USDT → cUSD",
  //   amount: "50 → 49.75",
  //   fiatValue: "$50.00",
  //   date: "Apr 25, 2025",
  //   status: "pending",
  // },
];

export const RecentTransactions = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
        <Button variant="outline" size="sm" className="text-xs rounded-full" asChild>
          <a href="/dashboard/transactions">View All</a>
        </Button>
      </CardHeader>
      <CardContent className={isMobile ? "p-2" : "p-6"}>
        <div className={`${isMobile ? "space-y-2" : "space-y-3"}`}>
          {transactions.map((tx) => (
            <div 
              key={tx.id} 
              className="flex items-center justify-between border rounded-lg p-2 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <div className={`flex ${isMobile ? "h-8 w-8" : "h-10 w-10"} items-center justify-center rounded-full ${
                  tx.type === "deposit" ? "bg-green-100 text-green-600" : 
                  tx.type === "withdraw" ? "bg-red-100 text-red-600" : 
                  "bg-blue-100 text-blue-600"
                }`}>
                  {tx.type === "deposit" && <ArrowDown className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />}
                  {tx.type === "withdraw" && <ArrowUp className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />}
                  {tx.type === "swap" && <RefreshCw className={`${isMobile ? "h-4 w-4" : "h-5 w-5"}`} />}
                </div>
                <div>
                  <div className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                    {tx.type === "deposit" ? "Deposit" : tx.type === "withdraw" ? "Withdrawal" : "Swap"}
                  </div>
                  <div className={`${isMobile ? "text-xs" : "text-sm"} text-muted-foreground`}>{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-medium ${isMobile ? "text-sm" : "text-base"}`}>
                  {tx.amount} {tx.type !== "swap" && tx.asset}
                </div>
                <div className={`${isMobile ? "text-xs" : "text-sm"} ${
                  tx.status === "completed" ? "text-green-600" : 
                  tx.status === "pending" ? "text-amber-600" : 
                  "text-red-600"
                }`}>
                  {tx.status === "completed" ? "Completed" : tx.status === "pending" ? "Pending" : "Failed"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
