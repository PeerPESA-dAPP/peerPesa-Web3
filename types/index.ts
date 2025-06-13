export type TransactionStep = 'initial' | 'details' | 'success';

export interface TransactionSummaryItem {
  label: string;
  value: string;
  isTotal?: boolean;
}

export interface Currency {
  code: string;
  name: string;
  flag?: string;
  logo: string;
}

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  balance: string;
  fiatValue: string;
  icon: React.ReactNode;
  color: string;
  price: {
    amount: string;
    currency: string;
    id: string;
    base_coin: string;
    quote_coin: string;
    buy_markup: number;
    sell_markup: number;
    exchange_markup: number;
    source: string;
    status: string;
  };
}

export interface Wallet {
  symbol: string;
  wallet: {
    balance: number;
    address: string;
  };
} 