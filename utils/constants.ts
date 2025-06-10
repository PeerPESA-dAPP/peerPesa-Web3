export const PAYMENT_METHODS = [
  { id: 'bank-transfer', name: 'Bank Transfer', icon: '🏦' },
  { id: 'mobile-money', name: 'Mobile Money', icon: '📱' }
];

export const SLIPPAGE_TOLERANCE = 0.5;

export const getTransactionFee = (currency: string): string => {
  const fees: Record<string, string> = {
    'CELO': '0.01',
    'USDT': '0.02',
    'USDC': '0.02'
  };
  return fees[currency] || '0.01';
};

export const getTransactionTime = (currency: string): string => {
  const times: Record<string, string> = {
    'CELO': '5',
    'USDT': '10',
    'USDC': '10'
  };
  return times[currency] || '5';
};

export const GET_CRYPTO_FEES = async (currency: string) => {
  // Mock implementation - replace with actual API call
  return {
    networks: [{
      avg_fee_usd: getTransactionFee(currency),
      transfer_time_sec: parseInt(getTransactionTime(currency)) * 60,
      slippage_percent: SLIPPAGE_TOLERANCE.toString()
    }]
  };
}; 