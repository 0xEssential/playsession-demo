/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  SignedOwnershipProof,
  SignedOwnershipProofInterface,
} from "../SignedOwnershipProof";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "nftOwner",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "nonce",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "nftContract",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "createMessage",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "ownershipSigner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "from",
            type: "address",
          },
          {
            internalType: "address",
            name: "authorizer",
            type: "address",
          },
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "address",
            name: "nftContract",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "gas",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "nonce",
            type: "uint256",
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes",
          },
        ],
        internalType: "struct IForwardRequest.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes",
      },
    ],
    name: "verifyOwnershipProof",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b506109a8806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312ce42fd146100465780631a929fb1146100735780639c48439f146100eb575b600080fd5b60005460405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b6100dd610081366004610716565b6040805173ffffffffffffffffffffffffffffffffffffffff808716602083015291810185905290831660608201526080810182905260009060a001604051602081830303815290604052805190602001209050949350505050565b60405190815260200161006a565b6100fe6100f9366004610840565b61010e565b604051901515815260200161006a565b60208083015173ffffffffffffffffffffffffffffffffffffffff9081166000908152600180845260408083208151808301909252805490941681529201549282018390529142106101a75760405162461bcd60e51b815260206004820152600f60248201527f53657373696f6e2045787069726564000000000000000000000000000000000060448201526064015b60405180910390fd5b8351815173ffffffffffffffffffffffffffffffffffffffff9081169116146102125760405162461bcd60e51b815260206004820152601560248201527f5369676e6572206e6f7420617574686f72697a65640000000000000000000000604482015260640161019e565b60006102dd61028a86602001518760e00151886060015189608001516040805173ffffffffffffffffffffffffffffffffffffffff808716602083015291810185905290831660608201526080810182905260009060a001604051602081830303815290604052805190602001209050949350505050565b6040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b60005490915073ffffffffffffffffffffffffffffffffffffffff166103038286610323565b73ffffffffffffffffffffffffffffffffffffffff161495945050505050565b60008060006103328585610347565b9150915061033f816103b7565b509392505050565b60008082516041141561037e5760208301516040840151606085015160001a610372878285856105ab565b945094505050506103b0565b8251604014156103a8576020830151604084015161039d8683836106a5565b9350935050506103b0565b506000905060025b9250929050565b60008160048111156103cb576103cb610943565b14156103d45750565b60018160048111156103e8576103e8610943565b14156104365760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e61747572650000000000000000604482015260640161019e565b600281600481111561044a5761044a610943565b14156104985760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e67746800604482015260640161019e565b60038160048111156104ac576104ac610943565b14156105205760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161019e565b600481600481111561053457610534610943565b14156105a85760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c60448201527f7565000000000000000000000000000000000000000000000000000000000000606482015260840161019e565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08311156105e2575060009050600361069c565b8460ff16601b141580156105fa57508460ff16601c14155b1561060b575060009050600461069c565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa15801561065f573d6000803e3d6000fd5b5050604051601f19015191505073ffffffffffffffffffffffffffffffffffffffff81166106955760006001925092505061069c565b9150600090505b94509492505050565b6000807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831660ff84901c601b016106df878288856105ab565b935093505050935093915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461071157600080fd5b919050565b6000806000806080858703121561072c57600080fd5b610735856106ed565b93506020850135925061074a604086016106ed565b9396929550929360600135925050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff811182821017156107ad576107ad61075a565b60405290565b600082601f8301126107c457600080fd5b813567ffffffffffffffff808211156107df576107df61075a565b604051601f8301601f19908116603f011681019082821181831017156108075761080761075a565b8160405283815286602085880101111561082057600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561085357600080fd5b823567ffffffffffffffff8082111561086b57600080fd5b90840190610120828703121561088057600080fd5b610888610789565b610891836106ed565b815261089f602084016106ed565b60208201526108b0604084016106ed565b60408201526108c1606084016106ed565b60608201526080830135608082015260a083013560a082015260c083013560c082015260e083013560e0820152610100808401358381111561090257600080fd5b61090e898287016107b3565b82840152505080945050602085013591508082111561092c57600080fd5b50610939858286016107b3565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220c404d525e33a45ff8184e3388a6505159338aeada18be8ddec67289ae7e8cccf64736f6c63430008090033";

type SignedOwnershipProofConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SignedOwnershipProofConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SignedOwnershipProof__factory extends ContractFactory {
  constructor(...args: SignedOwnershipProofConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
    this.contractName = "SignedOwnershipProof";
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<SignedOwnershipProof> {
    return super.deploy(overrides || {}) as Promise<SignedOwnershipProof>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): SignedOwnershipProof {
    return super.attach(address) as SignedOwnershipProof;
  }
  connect(signer: Signer): SignedOwnershipProof__factory {
    return super.connect(signer) as SignedOwnershipProof__factory;
  }
  static readonly contractName: "SignedOwnershipProof";
  public readonly contractName: "SignedOwnershipProof";
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SignedOwnershipProofInterface {
    return new utils.Interface(_abi) as SignedOwnershipProofInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SignedOwnershipProof {
    return new Contract(
      address,
      _abi,
      signerOrProvider
    ) as SignedOwnershipProof;
  }
}
