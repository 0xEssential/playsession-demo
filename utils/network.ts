import { Web3Provider } from '@ethersproject/providers';

const chainArgs = {
  '1': {
    chainId: '0x1',
  },
  '4': {
    chainId: '0x4',
    chainName: 'Ethereum - Rinkeby Testnet',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://rinkeby.infura.io/v3/undefined'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
};

export function wrongNetwork(networkId: number): boolean {
  return networkId !== parseInt(process.env.CHAIN_ID!, 10);
}

export async function switchNetwork(
  provider: Web3Provider,
  chainID: string,
): Promise<void> {
  try {
    await provider.send('wallet_switchEthereumChain', [
      { chainId: chainArgs[chainID].chainId },
    ]);
  } catch (error) {
    // This error code indicates that the chain has not been added to MetaMask.
    if (error.code === 4902) {
      try {
        provider.send('wallet_addEthereumChain', [chainArgs[chainID]]);
      } catch (addError) {
        // handle "add" error
      }
    }
  }
}

export function addEtherscan(transaction: Record<string, string>): {
  link: string;
} {
  return {
    link: `${process.env.ETHERSCAN_ROOT}/tx/${transaction.hash}`,
  };
}
