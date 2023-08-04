import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Allerta } from 'next/font/google'
const allerta = Allerta({
  weight: "400",
  subsets: ["latin"]
})

export default function App({ Component, pageProps }: AppProps) {
  return <main className={allerta.className}>
    <Component {...pageProps} />
  </main>
}
