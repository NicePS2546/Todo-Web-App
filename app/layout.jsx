import './globals.css'
import { Inter } from 'next/font/google'
import AuthProvider from './authProvider'
import Navbar from '@/components/Navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: '',
  description: 'Create by NICE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen">
        <AuthProvider>
        <Navbar/>
        {children}
        </AuthProvider>
        </body>
        
    </html>
  )
}
