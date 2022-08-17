import { Web3Provider } from '@ethersproject/providers';
import React, { ReactElement } from 'react';

import DelegatePermission from '~components/NFightBurnerAuth/DelegatePermission';
import { OssoButtonComponentProps } from '~components/NFightBurnerAuth/index.types';
import { EssentialEvent } from '~pages';

const WalletConnectForm = ({
  ButtonComponent,
  address,
  provider,
  onConnectWallet,
  onEvent,
}: {
  ButtonComponent: React.FC<OssoButtonComponentProps>;
  address: string;
  provider: Web3Provider;
  onConnectWallet: () => Promise<void>;
  onEvent: (event: EssentialEvent) => void;
}): ReactElement => {
  return (
    <div>
      <>
        <h2>ETH Wallet</h2>
        {address && provider ? (
          <DelegatePermission
            ButtonComponent={ButtonComponent}
            address={address}
            provider={provider}
            onEvent={onEvent}
          />
        ) : (
          <ButtonComponent
            loading={false}
            onClick={onConnectWallet}
            text="Connect Wallet"
          />
        )}
      </>
    </div>
  );
};
export default WalletConnectForm;
