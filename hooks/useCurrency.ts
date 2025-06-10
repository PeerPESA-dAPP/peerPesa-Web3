import { useState, useEffect } from 'react';

interface CurrencyRate {
  symbol: string;
  price: {
    amount: string;
  };
}

interface CurrencyResponse {
  success: boolean;
  data: CurrencyRate[];
}

export const useCurrency = () => {
  const [rates, setRates] = useState<CurrencyRate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCurrencyExchangeRates = async (params: { quote_coin: string }) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/currency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
      
      const data: CurrencyResponse = await response.json();
      
      if (data.success) {
        setRates(data.data);
        return data;
      } else {
        throw new Error('Failed to fetch rates');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return { data: [] };
    } finally {
      setLoading(false);
    }
  };

  const fetchYellowCardCurrencyExchangeRates = async (params: { base_currency: string }) => {
    // Mock implementation - replace with actual API call
    return {
      data: {
        rates: [
          { code: params.base_currency, sell: '0.05' }
        ]
      }
    };
  };

  return {
    rates,
    loading,
    error,
    fetchCurrencyExchangeRates,
    fetchYellowCardCurrencyExchangeRates,
  };
}; 