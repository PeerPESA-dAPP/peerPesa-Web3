import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { wagmiConfig } from '@/lib/walletConnect'
import { PROJECT_ID } from './index'

// Create the wagmi adapter for AppKit
export const wagmiAdapter = new WagmiAdapter({
  networks: [...wagmiConfig.chains],
  projectId: PROJECT_ID,
  wagmiConfig
})

// Export the project ID
export { PROJECT_ID as projectId }

// Export wagmi chains as networks
export const networks = [...wagmiConfig.chains] 