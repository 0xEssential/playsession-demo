/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  EssentialEIP712,
  EssentialEIP712Interface,
} from "../EssentialEIP712";

const _abi = [
  {
    inputs: [],
    name: "getChainId",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class EssentialEIP712__factory {
  static readonly abi = _abi;
  static createInterface(): EssentialEIP712Interface {
    return new utils.Interface(_abi) as EssentialEIP712Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EssentialEIP712 {
    return new Contract(address, _abi, signerOrProvider) as EssentialEIP712;
  }
}
