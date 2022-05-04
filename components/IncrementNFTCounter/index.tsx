import { EssentialSigner } from '@0xessential/signers';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Wallet } from 'ethers';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import _Counter from '../../abis/Counter.json';
import { HedgehogContext } from '../../contexts/hedgehogContext';
import { Web3Context } from '../../contexts/web3context';
import useWrappedContractPrimary from '../../hooks/useWrappedContractPrimary';
import { Counter } from '../../typechain';
import { addEtherscan } from '../../utils/network';
import { Button } from '..';
import NFTFinder, { NFT } from '../NFTFinder';

const IncrementNFTCounter = (): ReactElement => {
  const { address, provider, notify } = useContext(Web3Context);
  const { hedgehog } = useContext(HedgehogContext);

  const [count, setCount] = useState(0);
  const [input, setInput] = useState<NFT>();
  const [loading, setLoading] = useState(false);
  const [burner, setBurner] = useState<Wallet>();

  useEffect(() => {
    if (!hedgehog) return;
    const wallet = new Wallet(
      hedgehog.getWallet().privKey,
      new JsonRpcProvider(process.env.RPC_URL),
    );
    setBurner(wallet);
  }, [hedgehog]);

  const CounterContract = new Contract(
    _Counter.address,
    _Counter.abi,
    new JsonRpcProvider(process.env.RPC_URL),
  ) as Counter;

  const MMCounter = useWrappedContractPrimary(_Counter.address, _Counter.abi);

  const fetchCount = async () => {
    const _count = await CounterContract.count(address);
    console.warn(_count);
    setCount(_count.toNumber());
  };

  const registerMM = async () => {
    setLoading(true);
    const result = await MMCounter.increment(
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

    const essentialCounter = new Contract(
      _Counter.address,
      _Counter.abi,
      // constructor should take main provider and optional burner
      // would allow removing authorizer from customData
      new EssentialSigner(burner.address, provider as Web3Provider, burner),
    ) as Counter;

    // Perhaps we should provide our own typed overrides?
    // it does sorta feel like we need an EssentialContract here, unless
    // we are able to return an object that conforms to ContractTransaction

    const { hash } = await essentialCounter.increment({
      customData: {
        authorizer: address, // address that owns NFT
        nftContract: input.contractAddress,
        nftChainId: '1',
        nftTokenId: input.tokenId.toString(),
      },
    });

    if (hash) {
      setLoading(false);

      const { emitter } = notify.hash(hash);

      emitter.on('all', () => addEtherscan({ hash }));
      emitter.on('txConfirmed', () => {
        setCount((count) => count + 1);
      });
    } else {
      setLoading(false);
      alert('error');
    }
  };

  useEffect(() => {
    const _fetch = async () => fetchCount();
    if (CounterContract) _fetch();
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
