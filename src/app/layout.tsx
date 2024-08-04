import './globals.css'
import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { ThemeProvider } from "@/components/theme-provider"


import { cookieToInitialState } from 'wagmi'

import { config } from '@/config'
import Web3ModalProvider from '@/context'

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body>
        <Web3ModalProvider initialState={initialState}>  <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          ><w3m-button />
            {children}
          </ThemeProvider></Web3ModalProvider>
      </body>
    </html>
  )
}