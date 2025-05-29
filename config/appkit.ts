import { createWagmiAdapter } from '@reown/appkit/wagmi'
import { wagmiConfig } from '@/lib/walletConnect'
import { PROJECT_ID } from './index'
import type { AppKitNetwork } from '@reown/appkit'

// Create the wagmi adapter for AppKit
export const wagmiAdapter = createWagmiAdapter({
  wagmiConfig,
  projectId: PROJECT_ID
})

// Export the project ID
export { PROJECT_ID as projectId }

// Convert wagmi chains to AppKit networks
export const networks: AppKitNetwork[] = wagmiConfig.chains.map(chain => ({
  id: chain.id,
  name: chain.name,
  rpcUrl: chain.rpcUrls.default.http[0],
  blockExplorerUrl: chain.blockExplorers?.default?.url,
  nativeCurrency: chain.nativeCurrency
})) 