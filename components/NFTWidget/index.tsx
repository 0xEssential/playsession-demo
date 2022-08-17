import { EssentialSigner } from '@0xessential/signers';
import { Contract } from '@ethersproject/contracts';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { Token } from '@zoralabs/zdk/dist/queries/queries-sdk';
import { NotificationType } from 'bnc-notify';
import { BigNumber, Signer, Wallet } from 'ethers';
import React, { ReactElement, useContext } from 'react';

import { Button } from '~components';
import { NFT } from '~components/NFTFinder';

import _Counter from '../../abis/Counter.json';
import { HedgehogContext } from '../../contexts/hedgehogContext';
import { Web3Context } from '../../contexts/web3context';
import { Counter } from '../../typechain';
import { addEtherscan } from '../../utils/network';
import { ipfs } from '../../utils/network';

const NFTWidget = ({
  nft,
  onCounted,
}: {
  nft: Token;
  onCounted: () => void;
}): ReactElement => {
  const { address, provider, notify } = useContext(Web3Context);
  const { hedgehog } = useContext(HedgehogContext);

  const registerMM = async ({ contractAddress, tokenId }: NFT) => {
    const signer = new EssentialSigner(address, provider as Web3Provider);

    await _register(signer, false, contractAddress, tokenId);
  };

  const register = async ({ contractAddress, tokenId }: NFT) => {
    const wallet = new Wallet(
      hedgehog.getWallet().privKey,
      new JsonRpcProvider(process.env.RPC_URL),
    );

    const signer = new EssentialSigner(
      wallet.address,
      provider as Web3Provider,
      wallet,
    );

    _register(signer, true, contractAddress, tokenId);
  };

  const _register = async (
    signer: Signer,
    burner: boolean,
    contractAddress: string,
    tokenId: BigNumber,
  ) => {
    // const [counted, setCounted] = useState(false);

    const essentialCounter = new Contract(
      _Counter.address,
      _Counter.abi,
      signer,
    ) as Counter;

    // mapping currently internal so cant do this yet
    // useEffect(() => {
    //   essentialCounter.reg
    // }, []);

    const notificationObject = {
      eventCode: JSON.stringify([nft.tokenContract, nft.tokenId]),
      type: 'pending' as NotificationType,
      message: 'Submitting your meta-transaction',
    };
    let notification;

    if (burner) {
      notification = notify.notification(notificationObject);
    }

    const { hash } = await essentialCounter.increment({
      customData: {
        authorizer: address, // address that owns NFT
        nftContract: contractAddress,
        nftChainId: '1',
        nftTokenId: tokenId.toString(),
      },
    });

    notification ||= notify.notification(notificationObject);

    if (hash) {
      const { emitter } = notify.hash(
        hash,
        JSON.stringify([nft.tokenContract, nft.tokenId]),
      );

      emitter.on('all', () => addEtherscan({ hash }));

      emitter.on('txSent', () => {
        addEtherscan({ hash });
        notification.dismiss();
      });
      emitter.on('txConfirmed', () => {
        addEtherscan({ hash });
        onCounted();
      });
    } else {
      notification.update({
        eventCode: 'submit',
        type: 'failed' as NotificationType,
        message: 'Meta-transaction failed',
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <img
        src={ipfs(nft?.image?.url)}
        width="100%"
        style={{ aspectRatio: '1', objectFit: 'contain' }}
      />
      <div style={{ width: '100%', flexShrink: 1, justifyContent: 'end' }}>
        <Button
          onClick={() =>
            register({
              contractAddress: nft.collectionAddress,
              tokenId: BigNumber.from(nft.tokenId),
            })
          }
          text="🔥 Count"
          fullWidth
        />

        <Button
          onClick={() =>
            registerMM({
              contractAddress: nft.collectionAddress,
              tokenId: BigNumber.from(nft.tokenId),
            })
          }
          text="🦊 Count"
          fullWidth
        />
      </div>
    </div>
  );
};

export default NFTWidget;
