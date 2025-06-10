import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowUp, ArrowDown, ArrowRight, Plus, ArrowLeftRight, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCurrency } from "@/context/CurrencyContext";

interface BalanceCardProps {
  className?: string;
  rates: any;
  accountWallets: any[];
  defaultCurrency: string;
}

export const BalanceCard = ({ className, rates, accountWallets, defaultCurrency }: BalanceCardProps) => {
  const navigate = useNavigate();
  const [showBalance, setShowBalance] = useState(true);
  const [theBalance, setTheBalance] = useState(0);
  const { theExchangeRateValue } = useCurrency();

  useEffect(() => {
    const intFun = async () => {
      let totalBalance_ = 0;
      const totalBalance = accountWallets.reduce((acc, wallet) => {
        return totalBalance_  =  totalBalance_ + Number(theExchangeRateValue(wallet, rates) || 0);
      }, 0);
      setTheBalance(totalBalance);
    }
    intFun();
  }, [accountWallets, rates]);

  return (
    <Card className={cn("bg-[#2A2A2A] text-white rounded-2xl md:rounded-2xl", className)}>
      <div className="flex flex-col md:flex-row">
        <div className="flex-1 md:border-r border-white/10">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium text-white/90">Estimated Balance</CardTitle>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowBalance(!showBalance)}
                className="h-8 w-8 text-white hover:bg-white/10 hover:text-white"
              >
                {showBalance ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <div className="text-4xl font-bold tracking-tight">
                {showBalance ? `${defaultCurrency} ${theBalance.toFixed(2)}` : "••••••"}
              </div>
              {/* <p className="text-sm text-white/70">+2.5% from last week</p> */}
            </div>
          </CardContent>
        </div>
        
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="grid grid-cols-5 gap-3 w-full">
            <Button 
              variant="secondary"
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-3 text-white hover:bg-white/10 rounded-xl h-auto"
              onClick={() => navigate("/dashboard/wallets/deposit")}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs font-medium">Deposit</span>
            </Button>
            <Button 
              variant="secondary"
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-3 text-white hover:bg-white/10 rounded-xl h-auto"
              onClick={() => navigate("/dashboard/wallets/withdraw")}
            >
              <ArrowDown className="h-5 w-5" />
              <span className="text-xs font-medium">Withdraw</span>
            </Button>
            <Button 
              variant="secondary"
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-3 text-white hover:bg-white/10 rounded-xl h-auto"
              onClick={() => navigate("/dashboard/wallets/send")}
            >
              <ArrowRight className="h-5 w-5" />
              <span className="text-xs font-medium">Send</span>
            </Button>
            <Button 
              variant="secondary"
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-3 text-white hover:bg-white/10 rounded-xl h-auto"
              onClick={() => navigate("/dashboard/wallets/swap")}
            >
              <ArrowLeftRight className="h-5 w-5" />
              <span className="text-xs font-medium">Swap</span>
            </Button>
            <Button 
              variant="secondary"
              className="flex flex-col items-center justify-center gap-2 bg-white/5 p-3 text-white hover:bg-white/10 rounded-xl h-auto"
              onClick={() => navigate("/dashboard/wallets/transfer")}
            >
              <ArrowRightLeft className="h-5 w-5" />
              <span className="text-xs font-medium">Transfer</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
