"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useConnect, useDisconnect, useAccount, useSwitchChain } from 'wagmi'
import { injected } from "@wagmi/connectors";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useClientMounted } from "@/hooks/useClientMount";
import {
          useAppKitEvents
        } from '@reown/appkit/react'
interface HeaderProps {
  onSettingsClick: () => void
}

export default function Header({ onSettingsClick }: HeaderProps) {
  const [hideConnectBtn, setHideConnectBtn] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState("");
  const { connect } = useConnect();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();
  const { address, isConnected } = useAccount();
  const mounted = useClientMounted();
  const events = useAppKitEvents()

  useEffect(() => {
    if (isConnected && address) {
      setSelectedWallet(address);
      setHideConnectBtn(true);
    }
  }, [isConnected, address]);

  async function checkConnectWalletStatus()
  {
      if (window.ethereum && window.ethereum.isMiniPay) {
        setHideConnectBtn(true);
        connect({ connector: injected({ target: "metaMask" }) });
        connectAccountWallet();
      } else {
         setHideConnectBtn(false);
      }
  }

  async function connectAccountWallet()
  {
    
    // The code must run in a browser environment and not in node environment
          if (window && window.ethereum) {
            // User has a injected wallet


            // connect to wallet connect here
            alert("connect to wallet connect here");


            // connect to mini pay 
            if (window.ethereum.isMiniPay) {
              // User is using Minipay

              // Requesting account addresses
              let accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
                params: [],
              });
              
              // console.log(accounts[0]);
              if (accounts[0])  setSelectedWallet(accounts[0])
            }

            // User is not using MiniPay
          }  else {

             setSelectedWallet("")
             setHideConnectBtn(false);
          }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  }

  const connectAcctWallet = async () => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      await connect({ connector: injected({ target: "metaMask" }) });
    } else {

      const resonseData  = await open();
      console.log("resonseData >>>>>>>>>>>>>>>>><<<<<<<<<<<< ", resonseData);
    }
  }

  useEffect(() => {
    console.log("Events: ", events);
  }, [events]);

  return (
    <header className="sticky top-0 z-10 border-b bg-white shadow-sm">

      <div className="flex h-18 items-center px-4">
        <div className="flex items-center">
          <Image
            src="/images/peerpesa-logo.png"
            alt="PeerPesa"
            width={400}
            height={100}
            className="h-16 w-auto"
            style={{ maxWidth: "200px" }}
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          
          {(!hideConnectBtn)? (
            <Button 
              variant="default" 
              size="sm" 
              className="mr-2 bg-primary text-white hover:bg-primary/90" 
              onClick={() => connectAcctWallet()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                className="mr-2"
                stroke="currentColor"
                fill="none"
              >
                <path
                  d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M18.9 8C18.9656 7.67689 19 7.34247 19 7C19 4.23858 16.7614 2 14 2C11.2386 2 9 4.23858 9 7C9 7.34247 9.03443 7.67689 9.10002 8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M7 7.99324H16C18.8284 7.99324 20.2426 7.99324 21.1213 8.87234C22 9.75145 22 11.1663 22 13.9961V15.9971C22 18.8269 22 20.2418 21.1213 21.1209C20.2426 22 18.8284 22 16 22H10C6.22876 22 4.34315 22 3.17157 20.8279C2 19.6557 2 17.7692 2 13.9961V11.9952C2 8.22211 2 6.33558 3.17157 5.16344C4.11466 4.2199 5.52043 4.03589 8 4H10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              Connect Wallet
           </Button>

          ):
          (
            <Button
            variant="default"
            size="sm"
            className="mr-2 bg-primary text-white hover:bg-primary/90 flex items-center"
            style={{ width: "150px", textAlign: "left" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="16"
              height="16"
              className="mr-2"
              stroke="currentColor"
              fill="none"
            >
              <path
                d="M16 14C16 14.8284 16.6716 15.5 17.5 15.5C18.3284 15.5 19 14.8284 19 14C19 13.1716 18.3284 12.5 17.5 12.5C16.6716 12.5 16 13.1716 16 14Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M18.9 8C18.9656 7.67689 19 7.34247 19 7C19 4.23858 16.7614 2 14 2C11.2386 2 9 4.23858 9 7C9 7.34247 9.03443 7.67689 9.10002 8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 7.99324H16C18.8284 7.99324 20.2426 7.99324 21.1213 8.87234C22 9.75145 22 11.1663 22 13.9961V15.9971C22 18.8269 22 20.2418 21.1213 21.1209C20.2426 22 18.8284 22 16 22H10C6.22876 22 4.34315 22 3.17157 20.8279C2 19.6557 2 17.7692 2 13.9961V11.9952C2 8.22211 2 6.33558 3.17157 5.16344C4.11466 4.2199 5.52043 4.03589 8 4H10"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <p className="mb-0 truncate">{selectedWallet}</p>
          </Button>
          )}
          {(hideConnectBtn)? (
            <>  
              <Button
                variant="ghost"
                size="icon"
                onClick={onSettingsClick}
                className="rounded-full text-secondary hover:bg-gray-100"
                >
                  <Image src="/images/settings.svg" alt="Settings" width={20} height={20} className="text-secondary" />
                  <span className="sr-only">Settings</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDisconnect}
                  className="rounded-full text-secondary hover:bg-gray-100"
                >
                  <Image src="/images/logout.svg" alt="Settings" width={20} height={20} className="text-secondary" />
                  <span className="sr-only">Logout</span>
                </Button>
              </>    
            ):(<>
            </>)}  
        </div>
      </div>
    </header>
  )
}
