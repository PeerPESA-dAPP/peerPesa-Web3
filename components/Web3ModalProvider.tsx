'use client';

import { createWeb3Modal } from '@web3modal/wagmi/react';
import { wagmiConfig } from '@/lib/walletConnect';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const projectId = 'eafc42381cbec5c38e917e067bee2a28';

// Initialize Web3Modal
createWeb3Modal({ wagmiConfig, projectId });

// Create a client
const queryClient = new QueryClient();

export function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 