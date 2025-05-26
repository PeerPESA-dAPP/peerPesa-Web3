'use client'
import { useDisconnect, useAccount, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { mainnet, polygon, arbitrum } from 'wagmi/chains'

export const ActionButtonList = () => {
    
    const { disconnect } = useDisconnect();
    const { open } = useWeb3Modal();
    const { switchChain } = useSwitchChain();

    const handleDisconnect = async () => {
      try {
        await disconnect();
      } catch (error) {
        console.error("Failed to disconnect:", error);
      }
    }

    const handleOpen = async () => {
      await open();
    }

    return (
      <div>
          <button onClick={() => open()}>Open</button>
          <button onClick={handleDisconnect}>Disconnect</button>
          <button onClick={() => switchChain({ chainId: polygon.id })}>Switch to Polygon</button>
      </div>
    )
}
