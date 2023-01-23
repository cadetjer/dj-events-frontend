import '@/styles/globals.css'
import {AuthProvider} from '@/context/AuthContext'
// import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }) {
  return <AuthProvider>
    <Component {...pageProps} />
    </AuthProvider>
}