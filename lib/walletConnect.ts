// lib/walletConnect.ts
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';

const projectId = 'eafc42381cbec5c38e917e067bee2a28'; // get this from https://cloud.walletconnect.com/

const metadata = {
  name: 'PeerPesa',
  description: 'PeerPesa Web3 Application',
  url: 'https://peerpesa.com', // origin must match your domain & subdomain
  icons: ['https://peerpesa.com/icon.png']
};

const chains = [mainnet, polygon, arbitrum] as const;

export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// Remove the createWeb3Modal call from here - it should be called in a component
