import { useState } from 'react';

interface WithdrawRequest {
  amount: string;
  currency: string;
  recipientAddress: string;
  paymentMethod: string;
}

interface WithdrawResponse {
  success: boolean;
  data?: any;
  error?: string;
}

interface Network {
  id: string;
  name: string;
  channelIds: string[];
}

export const useWithdraw = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [networks, setNetworks] = useState<Network[]>([]);

  const fetchWithdrawNetworks = async (params: { currency: string; type: string }) => {
    // Mock implementation - replace with actual API call
    const mockNetworks: Network[] = [
      {
        id: 'bank-1',
        name: 'Bank Transfer',
        channelIds: ['channel-1', 'channel-2']
      },
      {
        id: 'mobile-1',
        name: 'Mobile Money',
        channelIds: ['momo-1', 'momo-2']
      }
    ];
    setNetworks(mockNetworks);
  };

  const validateReceiveAccount = async (data: any) => {
    // Mock implementation - replace with actual API call
    return {
      status: true,
      data: {
        accountNumber: data.accountNumber,
        accountName: 'John Doe'
      },
      message: 'Account validated successfully'
    };
  };

  const initiateWithdrawal = async (withdrawData: WithdrawRequest): Promise<WithdrawResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/withdraw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(withdrawData),
      });

      const data = await response.json();

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        throw new Error(data.error || 'Withdrawal failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getWithdrawalHistory = async (): Promise<WithdrawResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/withdraw/history');
      const data = await response.json();

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        throw new Error(data.error || 'Failed to fetch withdrawal history');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const getWithdrawalFees = async (currency: string): Promise<WithdrawResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/withdraw/fees?currency=${currency}`);
      const data = await response.json();

      if (data.success) {
        return { success: true, data: data.data };
      } else {
        throw new Error(data.error || 'Failed to fetch withdrawal fees');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    networks,
    fetchWithdrawNetworks,
    validateReceiveAccount,
    initiateWithdrawal,
    getWithdrawalHistory,
    getWithdrawalFees,
  };
}; 