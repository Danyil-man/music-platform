//import '@/styles/globals.css'
import { wrapper } from '@/store'
import type { AppProps } from 'next/app'
import { FC } from 'react';

const WrappedApp: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp);
