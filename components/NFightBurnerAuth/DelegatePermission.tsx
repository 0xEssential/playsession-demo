import { EssentialSigner } from '@0xessential/signers';
import { Web3Provider } from '@ethersproject/providers';
import { BigNumber, constants, Contract } from 'ethers';
import React, { ReactElement, useContext, useEffect } from 'react';

import EssentialPlaySessionContract from '~abis/EssentialPlaySession.json';
import { HedgehogContext } from '~contexts/hedgehogContext';
import { EssentialEvent } from '~pages';

import { Pill } from '..';
import { OssoButtonComponentProps } from './index.types';

const DelegatePermission = ({
  ButtonComponent,
  address,
  provider,
  onEvent,
}: {
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  address: string;
  provider: Web3Provider;
  onEvent: (event: EssentialEvent) => void;
}): ReactElement => {
  const { hedgehog, authorized, updateAuthorization, signedIn } =
    useContext(HedgehogContext);

  useEffect(() => {
    updateAuthorization(address);
  }, [address, signedIn]);

  const createSignedSession = async () => {
    const signer = new EssentialSigner(
      address,
      provider as Web3Provider,
      null,
      process.env.RELAYER_URI,
      () => {
        onEvent({
          key: 'relayed',
          id: `session-${address}`,
        });
      },
    );

    const PS = new Contract(
      EssentialPlaySessionContract.address,
      EssentialPlaySessionContract.abi,
      signer,
    );

    // Perhaps we should provide our own typed overrides?
    // it does sorta feel like we need an EssentialContract here, unless
    // we are able to return an object that conforms to ContractTransaction

    const { hash } = await PS.createSignedSession(
      hedgehog.getWallet().getAddressString(),
      BigNumber.from(100_000_000),
      {
        customData: {
          nftContract: constants.AddressZero,
          nftTokenId: 0,
          nftChainId: 0,
        },
      },
    );

    onEvent({ key: 'submitted', id: `session-${address}`, hash });
  };

  return (
    <>
      {authorized ? (
        <>
          <Pill color="green" text="NFTs authenticated" />
          <p>Your burner wallet has permission to use NFTs from</p>
          <p className="address">{address}</p>
        </>
      ) : (
        <>
          <Pill color="red" text="Not authenticated" />
          <p>Your burner needs permission to use NFTs from</p>
          <p className="address">{address}</p>
          <ButtonComponent
            text="Authorize your Burner"
            onClick={createSignedSession}
          />
        </>
      )}
    </>
  );
};

export default DelegatePermission;
