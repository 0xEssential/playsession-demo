import { ZDK } from '@zoralabs/zdk';
import { Token } from '@zoralabs/zdk/dist/queries/queries-sdk';

const API_ENDPOINT = 'https://api.zora.co/graphql';
const zdk = new ZDK({ endpoint: API_ENDPOINT }); // Defaults to Ethereum Mainnet

import React, { ReactElement, useContext, useEffect, useState } from 'react';

import NFTWidget from '~components/NFTWidget';

import { Web3Context } from '../../contexts/web3context';

const NFTLoader = ({ increment }: { increment: () => void }): ReactElement => {
  const { address } = useContext(Web3Context);
  const [nfts, setNfts] = useState<Token[]>([]);

  useEffect(() => {
    if (!address) return;
    const fetch = async () => {
      const args = {
        where: {
          // collectionAddresses: ['0x8d04a8c79cEB0889Bdd12acdF3Fa9D207eD3Ff63'],
          ownerAddresses: [address],
        },
        // pagination: { limit: 30 }, // Optional, limits the response size to 3 NFTs
        includeFullDetails: false, // Optional, provides more data on the NFTs such as events
        includeSalesHistory: false, // Optional, provides sales data on the NFTs
      };

      const { tokens } = await zdk.tokens(args);
      setNfts(tokens?.nodes.map((token) => token.token as Token));
    };

    fetch();
  }, [address]);
  return (
    <>
      <div
        style={{
          overflow: 'hidden',
          width: '100%',
          display: 'grid',
          gridGap: 10,
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr) )',
        }}
      >
        {nfts
          ?.filter((nft) => nft?.image?.mimeType?.match(/image\/*/))
          .map((nft) => (
            <NFTWidget
              onCounted={increment}
              nft={nft}
              key={JSON.stringify({
                a: nft.collectionAddress,
                id: nft.tokenId,
              })}
            />
          ))}
      </div>
    </>
  );
};

export default NFTLoader;
