import { wrapContract } from '@0xessential/metassential';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { useContext, useMemo } from 'react';

import EssentialForwarder from '../abis/EssentialForwarder.json';
import { Web3Context } from '../contexts/web3context';

export default function useContract(
  contractAddress: string,
  ABI: ContractInterface,
) {
  const { address, provider } = useContext(Web3Context);
  const jsonProvider = new JsonRpcProvider(process.env.RPC_URL);
  return useMemo(() => {
    return wrapContract(
      provider,
      address,
      new Contract(contractAddress, ABI, provider),
      Object.assign(
        new Contract(
          EssentialForwarder.address,
          EssentialForwarder.abi,
          jsonProvider,
        ),
        { name: '0xEssential PlaySession' },
      ),
    ) as Contract;
  }, [contractAddress]);
}
