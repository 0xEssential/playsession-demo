import { Contract, ContractInterface } from '@ethersproject/contracts';
import { providers } from 'ethers';
import { useContext, useMemo } from 'react';

import { Web3Context } from '../contexts/web3context';

export default function useContract(
  contractAddress: string,
  ABI: ContractInterface,
) {
  const { address, provider } = useContext(Web3Context);

  return useMemo(
    () => new Contract(contractAddress, ABI, provider.getSigner()),
    [provider, address, ABI],
  );
}
