/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export declare namespace IForwardRequest {
  export type ERC721ForwardRequestStruct = {
    from: string;
    authorizer: string;
    to: string;
    nftContract: string;
    nftNonce: BigNumberish;
    tokenId: BigNumberish;
    value: BigNumberish;
    gas: BigNumberish;
    nonce: BigNumberish;
    data: BytesLike;
  };

  export type ERC721ForwardRequestStructOutput = [
    string,
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    BigNumber,
    string
  ] & {
    from: string;
    authorizer: string;
    to: string;
    nftContract: string;
    nftNonce: BigNumber;
    tokenId: BigNumber;
    value: BigNumber;
    gas: BigNumber;
    nonce: BigNumber;
    data: string;
  };
}

export interface SignedOwnershipProofInterface extends utils.Interface {
  contractName: "SignedOwnershipProof";
  functions: {
    "createMessage(address,uint256,address,uint256,uint256)": FunctionFragment;
    "ownershipSigner()": FunctionFragment;
    "verifyOwnershipProof((address,address,address,address,uint256,uint256,uint256,uint256,uint256,bytes),bytes)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createMessage",
    values: [string, BigNumberish, string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "ownershipSigner",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "verifyOwnershipProof",
    values: [IForwardRequest.ERC721ForwardRequestStruct, BytesLike]
  ): string;

  decodeFunctionResult(
    functionFragment: "createMessage",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "ownershipSigner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "verifyOwnershipProof",
    data: BytesLike
  ): Result;

  events: {};
}

export interface SignedOwnershipProof extends BaseContract {
  contractName: "SignedOwnershipProof";
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: SignedOwnershipProofInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    createMessage(
      nftOwner: string,
      nonce: BigNumberish,
      nftContract: string,
      tokenId: BigNumberish,
      tokenNonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    ownershipSigner(overrides?: CallOverrides): Promise<[string]>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  createMessage(
    nftOwner: string,
    nonce: BigNumberish,
    nftContract: string,
    tokenId: BigNumberish,
    tokenNonce: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  ownershipSigner(overrides?: CallOverrides): Promise<string>;

  verifyOwnershipProof(
    req: IForwardRequest.ERC721ForwardRequestStruct,
    signature: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    createMessage(
      nftOwner: string,
      nonce: BigNumberish,
      nftContract: string,
      tokenId: BigNumberish,
      tokenNonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    ownershipSigner(overrides?: CallOverrides): Promise<string>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    createMessage(
      nftOwner: string,
      nonce: BigNumberish,
      nftContract: string,
      tokenId: BigNumberish,
      tokenNonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    ownershipSigner(overrides?: CallOverrides): Promise<BigNumber>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createMessage(
      nftOwner: string,
      nonce: BigNumberish,
      nftContract: string,
      tokenId: BigNumberish,
      tokenNonce: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    ownershipSigner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    verifyOwnershipProof(
      req: IForwardRequest.ERC721ForwardRequestStruct,
      signature: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
