import React, { ReactElement, useContext, useEffect, useState } from 'react';

import _Counter from '../../abis/Counter.json';
import { Web3Context } from '../../contexts/web3context';
import useWrappedContract from '../../hooks/useWrappedContract';
import useWrappedContractPrimary from '../../hooks/useWrappedContractPrimary';
import { Button } from '..';
import NFTFinder, { NFT } from '../NFTFinder';

const IncrementNFTCounter = (): ReactElement => {
  const { address } = useContext(Web3Context);

  const [count, setCount] = useState(0);
  const [input, setInput] = useState<NFT>();
  const [loading, setLoading] = useState(false);

  const Counter = useWrappedContract(_Counter.address, _Counter.abi);
  const MMCounter = useWrappedContractPrimary(_Counter.address, _Counter.abi);

  const fetchCount = async () => {
    const _count = await Counter.count(address);
    setCount(_count.toString());
  };

  const registerMM = async () => {
    setLoading(true);
    const result = await MMCounter.incrementFromForwarderOnly(
      input.contractAddress,
      input.tokenId,
      address,
    ).catch(() => {
      setLoading(false);
    });

    if (!result) return;

    await fetch(process.env.AUTOTASK_URI, {
      method: 'POST',
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => resp.json());
    // send to relayer, relayer submits tx and gives us hash that we notify

    setLoading(false);
  };

  const register = async () => {
    setLoading(true);
    const result = await Counter.incrementFromForwarderOnly(
      input.contractAddress,
      input.tokenId,
      address,
    );

    await fetch(process.env.AUTOTASK_URI, {
      method: 'POST',
      body: JSON.stringify(result),
      headers: { 'Content-Type': 'application/json' },
    }).then((resp) => resp.json());

    setLoading(false);
  };

  useEffect(() => {
    fetchCount();
  }, []);
  return (
    <>
      <p>You have registered {count} NFTs</p>
      <p>
        Paste an OpenSea or Rainbow link to an NFT and click the register button
        - if your primary account owns the NFT, it will increase your count of
        registered NFTs, persisted on-chain on Polygon.
      </p>
      <NFTFinder
        onChange={(e) => {
          console.warn(e);
          setInput(e);
        }}
      />
      <Button
        text="Register NFT from Primary"
        loading={loading}
        onClick={registerMM}
      />
      <Button
        text="Register NFT from Burner"
        loading={loading}
        onClick={register}
      />

      {count > 0 && (
        <>
          <p>
            Did you notice we submitted a transaction signed by your burner
            without user intervention?
          </p>
          <p>
            Since the Burner address doesn&apos;t hold any assets, and you
            performed a transaction from your Primary account giving your Burner
            access, our meta-transaction approach accepts a signature from your
            burner to use your Primary account NFTs on our protocol.
          </p>
          <p>
            We&apos;re excited to bring this approach to games - needing to sign
            messages for every game move takes players out of flow.
          </p>
        </>
      )}
    </>
  );
};

export default IncrementNFTCounter;
