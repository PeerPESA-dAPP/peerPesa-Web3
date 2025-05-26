'use client'
import { useDisconnect, useAccount, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'

export const ConnectionActionList = {
  handleOpen: async () => {
    const { open } = useWeb3Modal()
    try {
      await open()
    } catch (error) {
      console.error("Failed to connect:", error)
    }
  }
}
