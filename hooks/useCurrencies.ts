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
          setCurrencies(response.data);
        } else {
          setError(response.error || 'Failed to fetch currencies');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch currencies');
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
          setPaymentWallets(response.data);
        } else {
          setError(response.error || 'Failed to fetch payment wallets');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch payment wallets');
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentWallets();
  }, []);

  return { paymentWallets, loading, error };
}; 