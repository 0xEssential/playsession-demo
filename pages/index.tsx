import { Web3Provider } from '@ethersproject/providers';
import { NotificationType } from 'bnc-notify';
import type { NextPage } from 'next';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef, useState } from 'react';

import { HedgehogContext } from '~contexts/hedgehogContext';
import { addEtherscan } from '~utils/network';

import { Button } from '../components';
import NFightBurnerAuth from '../components/NFightBurnerAuth';
import { Web3Context } from '../contexts/web3context';

const notificationObject = {
  eventCode: `delegate-address`,
  type: 'pending' as NotificationType,
  message: 'Submitting your meta-transaction',
};

export type EssentialEvent = {
  key: 'relayed' | 'submitted' | 'succeeded' | 'replaced' | 'failed';
  id: string;
  hash?: string;
};

const Home: NextPage = () => {
  const { authorized } = useContext(HedgehogContext);
  const { onboard, address, provider, notify } = useContext(Web3Context);
  const router = useRouter();
  const [key, setKey] = useState<number>(new Date().getTime());
  const interval = useRef(null);
  const notification = useRef(null);

  const onEssentialEvent = (event: EssentialEvent) => {
    const { key, id: _id, hash } = event;
    switch (key) {
      case 'relayed':
        const _notification = notify.notification(notificationObject);
        notification.current = _notification;
        break;
      case 'submitted':
        const { emitter } = notify.hash(hash);

        emitter.on('all', () => addEtherscan({ hash }));

        emitter.on('txSent', () => {
          notification?.current?.dismiss();
          addEtherscan({ hash });
        });

        emitter.on('txConfirmed', () => {
          addEtherscan({ hash });
          interval.current = setInterval(() => {
            setKey(new Date().getTime());
          }, 1000);
        });
        break;
      case 'succeeded':
        break;
      case 'failed':
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (authorized && interval.current) clearInterval(interval.current);
    return () => clearInterval(interval?.current);
  }, [authorized]);

  return (
    <div className="app" key={key}>
      {/* <Image src={'/logo.svg'} width="400" height="200" /> */}
      <>
        <h2>Burner Wallet Protocol</h2>
        <h4>Link your wallet to a Burner for smooth gameplay</h4>

        <NFightBurnerAuth
          ButtonComponent={Button}
          onReady={() => router.push('/count')}
          provider={provider as Web3Provider}
          address={address}
          onEvent={onEssentialEvent}
          onConnectWallet={async () => {
            await onboard?.walletSelect();
            await onboard?.walletCheck();
          }}
        />
      </>
    </div>
  );
};
export default Home;
