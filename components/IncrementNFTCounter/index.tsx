import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import _Counter from '../../abis/Counter.json';
import { Web3Context } from '../../contexts/web3context';
import { Counter } from '../../typechain';
import NFTLoader from '../NFTLoader';

const IncrementNFTCounter = (): ReactElement => {
  const { address } = useContext(Web3Context);

  const [count, setCount] = useState(0);

  const CounterContract = new Contract(
    _Counter.address,
    _Counter.abi,
    new JsonRpcProvider(process.env.RPC_URL),
  ) as Counter;

  const fetchCount = async () => {
    const _count = await CounterContract.count(address);
    console.warn(_count);
    setCount(_count.toNumber());
  };

  useEffect(() => {
    if (!address) return;
    const _fetch = async () => fetchCount();
    if (CounterContract) _fetch();
  }, [address]);

  return (
    <>
      <h3>You have counted {count} NFTs</h3>
      <NFTLoader increment={() => setCount((count) => (count += 1))} />
    </>
  );
};

export default IncrementNFTCounter;
