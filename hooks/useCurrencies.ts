import { useState, useEffect } from 'react';
import { peerPesaAPI, SupportedCurrency, PaymentWallet } from '@/utils/api';

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<SupportedCurrency[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await peerPesaAPI.getSupportedCurrencies();
        
        if (response.success && response.data) {
          // Handle different response structures
          let data: SupportedCurrency[] = [];
          if (Array.isArray(response.data)) {
            data = response.data;
          } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
            const nestedData = (response.data as any).data;
            data = Array.isArray(nestedData) ? nestedData : [];
          }
          setCurrencies(data);
        } else {
          setError(response.error || 'Failed to fetch currencies');
          setCurrencies([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
        setCurrencies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  return { currencies, loading, error };
};

export const usePaymentWallets = () => {
  const [paymentWallets, setPaymentWallets] = useState<PaymentWallet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentWallets = async () => {
      try {
        setLoading(true);
        const response = await peerPesaAPI.getPaymentWallets();
        
        if (response.success && response.data) {
          // Handle different response structures
          let data: PaymentWallet[] = [];
          if (Array.isArray(response.data)) {
            data = response.data;
          } else if (response.data && typeof response.data === 'object' && 'data' in response.data) {
            const nestedData = (response.data as any).data;
            data = Array.isArray(nestedData) ? nestedData : [];
          }
          setPaymentWallets(data);
        } else {
          setError(response.error || 'Failed to fetch payment wallets');
          setPaymentWallets([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch payment wallets');
        setPaymentWallets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentWallets();
  }, []);

  return { paymentWallets, loading, error };
}; 