// src/components/web3/ConnectButton.tsx
'use client'

import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'

export function ConnectButton() {
  return (
    <RainbowConnectButton 
      label="Connect Wallet"
      showBalance={true}
      chainStatus="icon"
    />
  )
}