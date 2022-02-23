import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import React, { ReactElement } from 'react';

export type NFT = {
  contractAddress: string;
  tokenId: BigNumber;
};

const openSea = (url: string): NFT | undefined => {
  if (!url.startsWith('https://opensea.io/assets')) return;

  const parts = url.split('/');
  const [contractAddress, tokenId] = parts.splice(parts.length - 2, 2);

  if (/^0x[a-fA-F0-9]{40}$/.test(contractAddress) && /^\d+$/.test(tokenId)) {
    return {
      tokenId: BigNumber.from(tokenId),
      contractAddress: getAddress(contractAddress),
    };
  }
};

const rainbow = (url: string): NFT | undefined => {
  if (!url.startsWith('https://rainbow.me')) return;

  const [contractAddress, tokenId] =
    new URL(url).searchParams.get('nft')?.split('_') || [];
  if (/^0x[a-fA-F0-9]{40}$/.test(contractAddress) && /^\d+$/.test(tokenId)) {
    return {
      tokenId: BigNumber.from(tokenId),
      contractAddress: getAddress(contractAddress),
    };
  }
};

const looksRare = (url: string): NFT | undefined => {
  if (!url.startsWith('https://looksrare.org/collections')) return;

  const parts = url.split('/');
  const [contractAddress, tokenId] = parts.splice(parts.length - 2, 2);

  if (/^0x[a-fA-F0-9]{40}$/.test(contractAddress) && /^\d+$/.test(tokenId)) {
    return {
      tokenId: BigNumber.from(tokenId),
      contractAddress: getAddress(contractAddress),
    };
  }
};

const RESOLVERS: ((url: string) => NFT | undefined)[] = [
  openSea,
  rainbow,
  looksRare,
];

const nftFromUrl = (url: string): NFT | undefined => {
  let resolved: NFT;
  let index = 0;

  while (!resolved && index < RESOLVERS.length) {
    resolved = RESOLVERS[index].call(this, url);
    index++;
  }
  return resolved;
};

const NFTFinder = ({
  onChange,
}: {
  onChange: (val: NFT) => void;
}): ReactElement => {
  return (
    <>
      <input
        onChange={(e) => {
          const resolved = nftFromUrl(e.target.value);
          resolved && onChange(resolved);
        }}
      />
    </>
  );
};

export default NFTFinder;
