'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { wagmiConfig } from '@/lib/walletConnect';
import { useEffect } from 'react';

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    createWeb3Modal({ wagmiConfig, projectId: 'eafc42381cbec5c38e917e067bee2a28' });
  }, []);

  return <>{children}</>;
} 