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
  code: string;
  name: string;
  isCrypto: boolean;
  logo: string;
}

export interface Wallet {
  symbol: string;
  wallet: {
    balance: number;
    address: string;
  };
} 