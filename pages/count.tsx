import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

import IncrementNFTCounter from '~components/IncrementNFTCounter';
import { Web3Context } from '~contexts/web3context';

const Home: NextPage = () => {
  const { address } = useContext(Web3Context);
  const router = useRouter();

  useEffect(() => {
    if (!address) router.replace('/');
  }, []);

  return (
    <div className="app">
      <div className="register">
        <IncrementNFTCounter />
      </div>
    </div>
  );
};
export default Home;
