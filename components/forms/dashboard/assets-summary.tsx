import React, {useState} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/context/CurrencyContext";
import {DynamicImage} from '@/helpers/dynamicSnap';

interface Asset {
  name: string;
  symbol: string;
  icon: string;
  balance: string;
  fiatValue: string;
  change: number;
}

interface AssetsSummaryProps {
  rates: any[];
  accountWallets: any[];
  defaultCurrency: string;
}

const assets: Asset[] = [
  
];

export const AssetsSummary = ({ rates, accountWallets, defaultCurrency }: AssetsSummaryProps) => {
  const { theExchangeRateValue } = useCurrency();

  const formatNumber = (num: number | string | undefined, decimals: number = 8) => {
    if (num === undefined || num === null) return "0";
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numValue)) return "0";
    return numValue.toFixed(decimals).replace(/\.?0+$/, '');
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Your Assets</CardTitle>
        <Button variant="outline" size="sm" className="text-xs rounded-full" asChild>
          <a href="/dashboard/assets">View All</a>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accountWallets
            .filter(asset => asset.token_type === 'Native')
            .sort((a, b) => a.symbol.localeCompare(b.symbol))
            .map((asset) => (
              <div key={asset.symbol} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                    <img 
                      src={DynamicImage(asset.symbol?.toLowerCase())}
                      alt={`${asset.token_name} icon`} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{asset.token_name}</div>
                    <div className="text-sm text-muted-foreground">{formatNumber(Number(asset.wallet.balance), 8)} {asset.symbol}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">{formatNumber(theExchangeRateValue(asset, rates), 4)} {defaultCurrency}</div>
                  <div className={`text-sm ${asset.change > 0 ? "text-green-600" : asset.change < 0 ? "text-red-600" : "text-muted-foreground"}`}>
                    {asset.change > 0 ? "+" : ""}{asset.change}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};
