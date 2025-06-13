import { API_BASE_URL, API_ENDPOINTS, REQUEST_TIMEOUT } from './config';

// Types for API responses
export interface SupportedCurrency {
  id: string;
  name: string;
  symbol: string;
  code: string;
  logo?: string;
  icon?: string;
  isActive: boolean;
  token_type: string;
  price: any;
}

export interface WithdrawRate {
  buy: number;
  sell: number;
  locale: string;
  rateId: string;
  code: string;
  updatedAt: string;
}

export interface WithdrawRatesResponse {
  status: boolean;
  data: {
    rates: WithdrawRate[];
  };
}

export interface PaymentWallet {
  id: string;
  name: string;
  type: 'bank' | 'mobile_money' | 'crypto';
  currency: string;
  accountNumber?: string;
  accountName?: string;
  isActive: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Generic API fetch function
async function fetchFromAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    console.log(`Fetching from API: ${API_BASE_URL}${endpoint}`);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(`API Response for ${endpoint}:`, data);
    
    return { success: true, data };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`API Error for ${endpoint}:`, errorMessage);
    return { success: false, error: errorMessage };
  }
}

// API Functions
export const peerPesaAPI = {
  // Fetch supported currencies
  getSupportedCurrencies: async (): Promise<ApiResponse<SupportedCurrency[]>> => {
    return fetchFromAPI<SupportedCurrency[]>(API_ENDPOINTS.SUPPORTED_CURRENCIES);
  },

  // Fetch withdraw rates for a specific currency
  getWithdrawRates: async (currency: string): Promise<ApiResponse<WithdrawRatesResponse>> => {
    const endpoint = `${API_ENDPOINTS.WITHDRAW_RATES}?currency=${currency.toUpperCase()}`;
    return fetchFromAPI<WithdrawRatesResponse>(endpoint);
  },

  // Fetch payment wallets
  getPaymentWallets: async (): Promise<ApiResponse<PaymentWallet[]>> => {
    return fetchFromAPI<PaymentWallet[]>(API_ENDPOINTS.PAYMENT_WALLETS);
  },

  // Fetch exchange rates
  getExchangeRates: async (): Promise<ApiResponse<any>> => {
    return fetchFromAPI(API_ENDPOINTS.EXCHANGE_RATES);
  },

  // Fetch wallet balance
  getWalletBalance: async (): Promise<ApiResponse<any>> => {
    return fetchFromAPI(API_ENDPOINTS.WALLET_BALANCE);
  },

  // Fetch transactions
  getTransactions: async (): Promise<ApiResponse<any>> => {
    return fetchFromAPI(API_ENDPOINTS.TRANSACTIONS);
  },
}; 