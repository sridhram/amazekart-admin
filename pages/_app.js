import '@/styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Navbar from '@/components/Navbar'
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <main className='flex p-4 bg-bg-light h-screen'>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  )
}