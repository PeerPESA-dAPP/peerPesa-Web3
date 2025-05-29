import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Web3ModalProvider } from "@/components/Web3ModalProvider"
import { AppKitInitializer } from "@/components/AppKitInitializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PeerPesa - Web3 Wallet",
  description: "Send, receive, and swap cryptocurrencies with PeerPesa",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppKitInitializer />
        <Web3ModalProvider>
          {children}
        </Web3ModalProvider>
      </body>
    </html>
  )
}


import './globals.css'