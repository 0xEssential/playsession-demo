import { wrapContract } from '@0xessential/metassential';
import { Contract, ContractInterface } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { Wallet } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import { useContext, useMemo } from 'react';

import EssentialForwarder from '../abis/EssentialForwarder.json';
import { HedgehogContext } from '../contexts/hedgehogContext';

export default function useWrappedContract(
  contractAddress: string,
  ABI: ContractInterface,
) {
  const { hedgehog } = useContext(HedgehogContext);
  const wallet = new Wallet(
    hedgehog.getWallet().privKey,
    new JsonRpcProvider(process.env.RPC_URL),
  );

  return useMemo(() => {
    return wrapContract(
      wallet.privateKey,
      getAddress(wallet.address),
      new Contract(contractAddress, ABI, wallet),
      Object.assign(
        new Contract(
          EssentialForwarder.address,
          EssentialForwarder.abi,
          new JsonRpcProvider(process.env.RPC_URL),
        ),
        { name: '0xEssential PlaySession' },
      ),
    ) as Contract;
  }, [contractAddress]);
}
