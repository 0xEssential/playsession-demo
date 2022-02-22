import {
  ExternalProvider,
  JsonRpcProvider,
  Web3Provider,
} from '@ethersproject/providers';
import { API } from 'bnc-notify';
import React, { createContext, ReactElement, useEffect, useState } from 'react';

import { initNotify, initOnboard } from '../utils/connect';

type Web3ContextValues = {
  onboard?: any;
  address?: string;
  provider?: Web3Provider | JsonRpcProvider;
  notify?: API;
  network?: number;
};

const defaultValue: Web3ContextValues = {};

const Web3Context = createContext(defaultValue);

const Web3ContextProvider = ({
  children,
}: {
  children: ReactElement;
}): ReactElement => {
  const [provider, setProvider] = useState<Web3Provider | JsonRpcProvider>(
    new JsonRpcProvider(process.env.RPC_URL),
  );
  const [address, setAddress] = useState<string>();
  const [network, setNetwork] = useState<number>();

  const [onboard, setOnboard] = useState<any>(null);
  const [notify, setNotify] = useState<API>(null);

  useEffect(() => {
    const onboard = initOnboard({
      address: setAddress,
      network: setNetwork,
      wallet: ({
        name,
        provider,
      }: {
        name: string;
        provider: ExternalProvider;
      }) => {
        if (provider) {
          const _provider = new Web3Provider(provider, 'any');
          setProvider(_provider);
          window.localStorage.setItem('selectedWallet', name);
        } else {
          setProvider(new JsonRpcProvider(process.env.RPC_URL));
        }
      },
    });

    setOnboard(onboard);
    setNotify(initNotify());
  }, []);

  useEffect(() => {
    const previouslySelectedWallet =
      window.localStorage.getItem('selectedWallet');

    if (previouslySelectedWallet && onboard) {
      onboard.walletSelect(previouslySelectedWallet);
    }
  }, [onboard]);

  const value = {
    onboard,
    address,
    provider,
    notify,
    network,
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
};

export default Web3ContextProvider;
export { Web3Context };
