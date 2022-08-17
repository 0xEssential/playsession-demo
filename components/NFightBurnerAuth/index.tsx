import { Web3Provider } from '@ethersproject/providers';
import React, { ReactElement, useContext, useEffect } from 'react';

import BurnerLoginForm from '~components/NFightBurnerAuth/BurnerLoginForm';
import WalletConnectForm from '~components/NFightBurnerAuth/WalletConnectForm';
import { HedgehogContext } from '~contexts/hedgehogContext';
import { EssentialEvent } from '~pages';

import { OssoButtonComponentProps, OssoInputProps } from './index.types';

export default function NFightBurnerAuth({
  ButtonComponent,
  onReady,
  provider,
  address,
  onEvent,
  onConnectWallet,
}: {
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  onReady: (username: string, password: string) => void;
  provider: Web3Provider;
  address: string;
  onEvent: (event: EssentialEvent) => void;
  onConnectWallet: () => Promise<void>;
}): ReactElement {
  const { authorized, signedIn, updateAuthorization } =
    useContext(HedgehogContext);

  useEffect(() => {
    if (!address || !signedIn) return;

    updateAuthorization(address);
  }, [address, signedIn]);

  return (
    <>
      <div className="message">
        <div>
          <h2>burner</h2>
          <BurnerLoginForm />
        </div>
        <WalletConnectForm
          ButtonComponent={ButtonComponent}
          address={address}
          provider={provider}
          onConnectWallet={onConnectWallet}
          onEvent={onEvent}
        />
      </div>

      {authorized && (
        <div className="continue">
          <ButtonComponent
            onClick={() => onReady('', '')}
            className="alt"
            text="Continue"
          />
        </div>
      )}
    </>
  );
}

const HTMLInputComponent = ({ label, ...inputProps }: OssoInputProps) => (
  <label>
    {label}
    <input {...inputProps} onChange={undefined} />
  </label>
);

NFightBurnerAuth.defaultProps = {
  InputComponent: HTMLInputComponent,
  containerStyle: undefined,
  submitText: 'Submit',
};
