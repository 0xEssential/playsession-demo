import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useContext, useMemo } from 'react';

import { Web3Context } from '../contexts/web3context';

export default function useContract(
  contractAddress: string,
  ABI: ContractInterface,
  _provider?: JsonRpcProvider,
) {
  const { address, provider } = useContext(Web3Context);

  const signerOrProvider =
    _provider || address ? provider?.getSigner(address) : provider;

  return useMemo(
    () => new Contract(contractAddress, ABI, signerOrProvider),
    [address, ABI, provider],
  );
}
