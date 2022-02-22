import { BigNumber } from 'ethers';
import React, { ReactElement, useContext, useEffect, useState } from 'react';

import EssentialForwarder from '../../abis/EssentialForwarder.json';
import { HedgehogContext } from '../../contexts/hedgehogContext';
import { Web3Context } from '../../contexts/web3context';
import useContract from '../../hooks/useContract';
import { Button } from '..';
import SwitchToPolygonButton from '../SwitchToPolygonButton';

const AuthenticateBurnerWallet = (): ReactElement => {
  const { hedgehog } = useContext(HedgehogContext);
  const { address, network } = useContext(Web3Context);
  const [loading, setLoading] = useState(true);

  const [authorized, setAuthorized] = useState(false);

  const PS = useContract(EssentialForwarder.address, EssentialForwarder.abi);

  useEffect(() => {
    const fetch = async () => {
      PS.createMessage(address, 0, address, 0)
        .then((resp) => {
          console.warn(resp);
          setAuthorized(true);
        })
        .catch((e) => {
          console.warn(e);
          setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetch();
  }, []);

  const createSession = async () => {
    const session = await PS.createSession(
      hedgehog.getWallet().getAddressString(),
      BigNumber.from(100_000_000),
    );
    console.warn(session);
  };

  if (loading) return null;

  return (
    <>
      {authorized ? (
        <p>Your Burner is authorized to use the NFTs in your Primary account</p>
      ) : (
        <>
          <p>
            Your Burner is not authorized to use the NFTs in your Primary
            account
          </p>
          {network === parseInt(process.env.CHAIN_ID, 10) ? (
            <Button text="Authorize your Burner" onClick={createSession} />
          ) : (
            <SwitchToPolygonButton />
          )}

          <p>
            Authorizing your burner address submits a transaction to the Polygon
            network that creates a PlaySession.
            <p>⚠️Your NFTs are still owned by your Primary address</p>
            <p>⚠️Your Burner cannot transfer your NFTs to another account</p>
            <p>
              ⚠️Creating a PlaySession <strong>only</strong> allows the burner
              to use your Primary account NFTs in games that use the
              0xEssentiall PlaySession protocol
            </p>
          </p>
        </>
      )}
    </>
  );
};

export default AuthenticateBurnerWallet;
