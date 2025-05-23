// lib/walletConnect.ts
import { configureChains, createConfig } from 'wagmi';
import { mainnet, polygon, arbitrum } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { walletConnectProvider } from '@web3modal/ethereum';
import { EthereumClient } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/wagmi';
import { http } from 'wagmi';

const projectId = 'eafc42381cbec5c38e917e067bee2a28'; // get this from https://cloud.walletconnect.com/

const { chains, publicClient } = configureChains(
  [mainnet, polygon, arbitrum],
  [walletConnectProvider({ projectId }), publicProvider()]
);

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum],
  connectors: [],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
  },
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);

export const web3modal = new Web3Modal({
  projectId,
  ethereumClient,
});
