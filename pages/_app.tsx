import type { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className='bg fixed inset-y-0 -inset-x-2/4 opacity-50 z-0 bg-gradient-to-r from-yellow-400 to-pink-500'></div>
      <div className='bg fixed inset-y-0 -inset-x-2/4 opacity-50 z-0 bg-gradient-to-r from-yellow-400 to-pink-500'></div>
      <div className='bg fixed inset-y-0 -inset-x-2/4 opacity-50 z-0 bg-gradient-to-r from-yellow-400 to-pink-500'></div>
      <Component {...pageProps} />
    </>
  )
}
export default MyApp
