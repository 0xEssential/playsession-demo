import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useContext, useMemo } from 'react';

import { Web3Context } from '../contexts/web3context';

export default function useContract(
  contractAddress: string,
  ABI: ContractInterface,
  provider: JsonRpcProvider,
) {
  const { address } = useContext(Web3Context);

  return useMemo(
    () => new Contract(contractAddress, ABI, provider),
    [address, ABI],
  );
}
