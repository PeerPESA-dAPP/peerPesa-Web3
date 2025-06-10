import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ArrowUp, ArrowDown, Filter, Joystick } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWallet } from "@/context/WalletsContext";
import { useAuth } from "@/context/AuthContext";
import {DynamicImage} from '@/helpers/dynamicSnap';
import { useCurrency } from "@/context/CurrencyContext";

interface Asset {
  id: string;
  name: string;
  symbol: string;
  price: string;
  balance: string;
  value: string;
  isCrypto: boolean;
  icon?: string;
}

const assets: Asset[] = [
  {
    id: "celo",
    name: "CELO",
    symbol: "CELO",
    price: "$0.00",
    balance: "0",
    value: "$0.00",
    isCrypto: true,
    icon: "/uploads/7932b22a-6176-48c9-a8de-427f19360f52.png"
  }
];

export const AssetsTable = () => {
  const [filter, setFilter] = useState<"all" | "crypto" | "fiat">("all");
  const isMobile = useIsMobile();
  const { theExchangeRateValue } = useCurrency();
  const [rates, setRates] = useState<any[]>([]);
  const {fetchCurrencyExchangeRates} = useCurrency();

  const {fetchWallets} = useWallet();
  const [defaultCurrency, setDefaultCurrency] = useState("USD");
  const [wallets, setWallets] = useState<any[]>([]);
  const [accountWallets, setAccountWallets] = useState<any[]>([]);
  const {authenticationToken, authenticationTokenValue, refreshAuthTokenCode} = useAuth();
  
  const initFunc = async () => {
    const data: any = {
      authToken: authenticationTokenValue
    }
    const walletsData: any  = await  fetchWallets(data)
    if(walletsData){
      setAccountWallets(walletsData)
    }
  }

  useEffect(() => {
    initFunc()
  }, [authenticationTokenValue]);

  useEffect(() => {
    const fetchRates = async () => {
      const eRates = await fetchCurrencyExchangeRates({quote_coin: defaultCurrency});
      setRates(eRates?.data ?? []);
    };
    fetchRates();
  }, [defaultCurrency, fetchCurrencyExchangeRates]);

  const filteredAssets = accountWallets.filter(asset => {
    if (filter === "all") return true;
    if (filter === "crypto") return asset.token_type === 'Native';
    if (filter === "fiat") return asset.token_type !== 'Native';
    return true;
  });

  const getAssetIcon = (asset: Asset) => {
    if (asset.icon) {
      return (
        <div className={`flex ${isMobile ? "h-8 w-8" : "h-10 w-10"} items-center justify-center rounded-full overflow-hidden`}>
          <img 
            src={asset.icon} 
            alt={`${asset.symbol} icon`}
            className="h-full w-full object-cover" 
          />
        </div>
      );
    }

    const bgColor = asset.isCrypto ? "bg-soft-blue" : "bg-soft-green";
    const textColor = asset.isCrypto ? "text-blue-600" : "text-green-600";
    const size = isMobile ? "h-8 w-8" : "h-10 w-10";
    return (
      <div className={`flex ${size} items-center justify-center rounded-full ${bgColor} ${textColor} font-medium`}>
        {asset.symbol.charAt(0)}
      </div>
    );
  };

  const formatNumber = (num: number | string, decimals: number = 8) => {
    const numValue = typeof num === 'string' ? Number(num) : num;
    return Number(numValue.toFixed(decimals)).toString();
  };

  const amountRate = (asset: any, rates: any[]) => {
    const rate = rates.find((item: any) => item.symbol.toLowerCase() === asset.symbol.toLowerCase());
    return formatNumber(rate?.price?.amount || 0, 4);
  };

  const calculateValue = (asset: any, rates: any[]) => {
    const rate = rates.find((item: any) => item.symbol.toLowerCase() === asset.symbol.toLowerCase());
    const value = Number(asset.wallet.balance) * (rate?.price?.amount || 0);
    return formatNumber(isNaN(value) ? 0 : value, 4);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 md:pb-4">
        <CardTitle className="text-base md:text-lg font-medium">Asset Holdings</CardTitle>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 md:gap-2 text-xs md:text-sm rounded-full hover:bg-gray-100 h-7 md:h-8 px-2 md:px-3"
              >
                <Filter className="h-3 w-3 md:h-4 md:w-4" />
                {filter === "all" ? "All" : filter === "crypto" ? "Crypto" : "Fiat"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white w-32">
              <DropdownMenuItem className="hover:bg-gray-100" onClick={() => setFilter("all")}>
                All Assets
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100" onClick={() => setFilter("crypto")}>
                Crypto
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-gray-100" onClick={() => setFilter("fiat")}>
                Fiat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isMobile ? (
          <div className="divide-y">
            {filteredAssets.map((asset) => (
              <div 
                key={asset.id} 
                className="p-2 border border-gray-200 rounded-lg mx-2 mb-2 shadow-sm"
              >
                <div className="flex">
                  <div className="flex-grow mr-3">
                    {/* Asset details on the left side */}
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                        <img 
                          src={DynamicImage(asset.symbol?.toLowerCase())}
                          alt={`${asset.token_name} icon`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="font-medium text-sm">{asset.symbol}</div>
                      <div className="ml-auto text-sm font-medium">{asset.price ?? 0.00}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 text-xs">
                      <div className="text-muted-foreground">Balance</div>
                      <div className="font-medium text-right">{asset.wallet.balance ?? 0.00}</div>
                      <div className="text-muted-foreground">Value</div>
                      <div className="font-medium text-right">{asset.wallet.balance ?? 0.00}</div>
                    </div>
                  </div>
                  
                  {/* Action buttons stacked vertically on the right with adjusted spacing */}
                  <div className="flex flex-col gap-1.5 justify-center min-w-[52px]">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 w-full rounded-full text-[10px] text-green-600 border-green-600 hover:bg-green-50 hover:text-green-700 hover:shadow-sm px-0 py-0"
                    >
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                      Buy
                    </Button>
                    {(asset.token_type === 'Native') && (
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-7 w-full rounded-full text-[10px] text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700 hover:shadow-sm px-0 py-0"
                      >
                        <img 
                          src="/uploads/3dba696d-bdf5-42b9-b3bf-1c0e59ecee99.png"
                          className="h-3 w-3 mr-0.5 object-contain text-blue-600 filter invert-[54%] sepia-[76%] saturate-[1500%] hue-rotate-[184deg] brightness-[98%] contrast-[101%]"
                          alt="Swap"
                        />
                        Swap
                      </Button>
                    )}
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-7 w-full rounded-full text-[10px] text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700 hover:shadow-sm px-0 py-0"
                    >
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                      Send
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30%]">Asset</TableHead>
                  <TableHead className="w-[20%]">Price</TableHead>
                  <TableHead className="w-[20%]">Balance</TableHead>
                  <TableHead className="w-[15%]">Value</TableHead>
                  <TableHead className="w-[15%]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAssets.map((asset) => (
                  <TableRow key={asset.id}>
                    <TableCell className="w-[30%]">
                      <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
                        <img 
                          src={DynamicImage(asset.symbol?.toLowerCase())}
                          alt={`${asset.token_name} icon`} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                        <div className="font-medium">{asset.symbol}</div>
                      </div>
                    </TableCell>

                    <TableCell className="w-[20%]">{amountRate(asset, rates)} {defaultCurrency}</TableCell>
                    <TableCell className="w-[20%]">
                      <span className="font-medium">{formatNumber(asset.wallet.balance ?? 0.00, 8)} {asset.symbol}</span>
                    </TableCell>
                    <TableCell className="w-[15%]">{calculateValue(asset, rates)} {defaultCurrency}</TableCell>
                    
                    <TableCell className="w-[15%]">
                      <div className="flex gap-1">
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="rounded-full text-green-600 border-green-600 hover:bg-green-50 hover:shadow-sm"
                        >
                          <ArrowDown className="h-4 w-4 mr-1" />
                          Buy
                        </Button>
                        {(asset.token_type === 'Native') && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="rounded-full text-blue-600 border-blue-600 hover:bg-blue-50 hover:shadow-sm"
                          >
                            <img 
                              src="/uploads/3dba696d-bdf5-42b9-b3bf-1c0e59ecee99.png"
                              className="h-4 w-4 mr-1 object-contain text-blue-600 filter invert-[54%] sepia-[76%] saturate-[1500%] hue-rotate-[184deg] brightness-[98%] contrast-[101%]"
                              alt="Swap"
                            />
                            Swap
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="rounded-full text-red-600 border-red-600 hover:bg-red-50 hover:shadow-sm"
                        >
                          <ArrowUp className="h-4 w-4 mr-1" />
                          Send
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
