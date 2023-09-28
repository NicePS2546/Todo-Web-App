import './globals.css'
import { Inter } from 'next/font/google'
import Layout from '@/components/Layout'
import AuthProvider from './authProvider'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '',
  description: 'Create by NICE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
        <Layout>{children}</Layout>
        </AuthProvider>
        </body>
        
    </html>
  )
}
