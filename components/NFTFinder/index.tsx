import { BigNumber } from 'ethers';
import { getAddress } from 'ethers/lib/utils';
import React, { ReactElement } from 'react';

export type NFT = {
  contractAddress: string;
  tokenId: BigNumber;
};

const openSea = (url: string): NFT | undefined => {
  const split = url.split('/');
  let tokenId, contractAddress;
  if (split[split.length - 1]) {
    tokenId = split[split.length - 1];
    contractAddress = split[split.length - 2];
  } else {
    tokenId = split[split.length - 2];
    contractAddress = split[split.length - 3];
  }
  if (/^0x[a-fA-F0-9]{40}$/.test(contractAddress) && /^\d+$/.test(tokenId)) {
    return {
      tokenId: BigNumber.from(tokenId),
      contractAddress: getAddress(contractAddress),
    };
  }
};

const rainbow = (url: string): NFT | undefined => {
  const [contractAddress, tokenId] =
    new URL(url).searchParams.get('nft')?.split('_') || [];
  return tokenId
    ? {
        tokenId: BigNumber.from(tokenId),
        contractAddress: getAddress(contractAddress),
      }
    : undefined;
};

const RESOLVERS: ((url: string) => NFT | undefined)[] = [openSea, rainbow];

const nftFromUrl = (url: string): NFT | undefined => {
  let resolved;
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
