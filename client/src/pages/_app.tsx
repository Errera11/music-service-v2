import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { Allerta } from 'next/font/google'
import {wrapper} from "@/store/store";
const allerta = Allerta({
  weight: "400",
  subsets: ["latin"]
})

export default wrapper.withRedux(function App({ Component, pageProps }: AppProps) {
  return <main className={allerta.className}>
    <Component {...pageProps} />
  </main>
})
