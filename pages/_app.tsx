import '../styles/globals.css';

import type { AppProps } from 'next/app';
import React from 'react';

import HedgehogContextProvider from '../contexts/hedgehogContext';
import Web3ContextProvider from '../contexts/web3context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HedgehogContextProvider>
      <Web3ContextProvider>
        <Component {...pageProps} />
      </Web3ContextProvider>
    </HedgehogContextProvider>
  );
}

export default MyApp;
