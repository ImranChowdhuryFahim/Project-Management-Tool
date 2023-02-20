import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RootState, store } from '../../store'
import { Provider } from 'react-redux'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


export default function App({ Component, pageProps }: AppProps) {


return <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
  
}
