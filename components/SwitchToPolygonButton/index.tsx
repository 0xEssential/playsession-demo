import React, { ReactElement, useContext } from 'react';

import { Web3Context } from '../../contexts/web3context';
import { Button } from '..';

const chainArgs = {
  '137': {
    chainId: '0x89',
    chainName: 'Matic Mainnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    iconUrls: [],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com/'],
  },
  '80001': {
    chainId: '0x13881',
    chainName: 'Mumbai Testnet',
    rpcUrls: ['https://polygon-rpc.com/'],
    iconUrls: [],
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://mumbai.polygonscan.com'],
  },
};

const SwitchToPolygonButton = (): ReactElement => {
  const { provider } = useContext(Web3Context);

  return (
    <Button
      onClick={async () => {
        await provider.send('wallet_addEthereumChain', [
          chainArgs[process.env.CHAIN_ID],
        ]);
      }}
      text="Switch to Polygon"
    />
  );
};

export default SwitchToPolygonButton;
