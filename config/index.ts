import { mainnet, arbitrum, polygon } from 'wagmi/chains'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'

// Get projectId from https://cloud.reown.com
export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID || "83c3e49e10fb832c59abed1b232949a3" // this is a public projectId only to use on localhost

if (!PROJECT_ID) {
  throw new Error('Project ID is not defined')
}

export const chains = [mainnet, arbitrum, polygon] as const

const metadata = {
  name: 'PeerPesa',
  description: 'PeerPesa Web3 Application',
  url: 'https://peerpesa.com',
  icons: ['https://peerpesa.com/icon.png']
}

export const config = defaultWagmiConfig({ chains, projectId: PROJECT_ID, metadata })