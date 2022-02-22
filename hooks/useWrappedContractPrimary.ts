import { wrapContract } from '@0xessential/metassential/metassential';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { useContext, useMemo } from 'react';

import EssentialForwarder from '../abis/EssentialForwarder.json';
import { Web3Context } from '../contexts/web3context';

export default function useContract(
  contractAddress: string,
  ABI: ContractInterface,
) {
  const { address, provider } = useContext(Web3Context);

  return useMemo(() => {
    return wrapContract(
      provider,
      address,
      new Contract(contractAddress, ABI, provider),
      Object.assign(
        new Contract(
          EssentialForwarder.address,
          EssentialForwarder.abi,
          provider,
        ),
        { name: '0xEssential PlaySession' },
      ),
    ) as Contract;
  }, [contractAddress]);
}
