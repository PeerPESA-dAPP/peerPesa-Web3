// API Configuration
export const API_BASE_URL = "https://api.peerpesa.co";

// API Endpoints
export const API_ENDPOINTS = {
  SUPPORTED_CURRENCIES: "/dapp/supported/currencies",
  EXCHANGE_RATES: "/dapp/exchange/rates",
  WALLET_BALANCE: "/dapp/wallet/balance",
  TRANSACTIONS: "/dapp/transactions",
  WITHDRAW_RATES: "/dapp/system/withdraw/rates",
  PAYMENT_WALLETS: "/dapp/system/wallets",
} as const;

// Request timeout
export const REQUEST_TIMEOUT = 10000; // 10 seconds 