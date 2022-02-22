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
        name: "account",
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
    stateMutability: "view",
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
  "0x608060405234801561001057600080fd5b506108e9806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806312ce42fd146100465780631a929fb1146100735780639c48439f14610094575b600080fd5b60005460405173ffffffffffffffffffffffffffffffffffffffff90911681526020015b60405180910390f35b610086610081366004610657565b6100b7565b60405190815260200161006a565b6100a76100a2366004610781565b6101aa565b604051901515815260200161006a565b73ffffffffffffffffffffffffffffffffffffffff8085166000908152600160208181526040808420815180830190925280549095168152939091015490830181905290919042106101505760405162461bcd60e51b815260206004820152600f60248201527f53657373696f6e2045787069726564000000000000000000000000000000000060448201526064015b60405180910390fd5b6040805173ffffffffffffffffffffffffffffffffffffffff808916602083015291810187905290851660608201526080810184905260a00160405160208183030381529060405280519060200120915050949350505050565b60008061021f6101cc85600001518660e00151876060015188608001516100b7565b6040517f19457468657265756d205369676e6564204d6573736167653a0a3332000000006020820152603c8101829052600090605c01604051602081830303815290604052805190602001209050919050565b60005490915073ffffffffffffffffffffffffffffffffffffffff166102458285610264565b73ffffffffffffffffffffffffffffffffffffffff1614949350505050565b60008060006102738585610288565b91509150610280816102f8565b509392505050565b6000808251604114156102bf5760208301516040840151606085015160001a6102b3878285856104ec565b945094505050506102f1565b8251604014156102e957602083015160408401516102de8683836105e6565b9350935050506102f1565b506000905060025b9250929050565b600081600481111561030c5761030c610884565b14156103155750565b600181600481111561032957610329610884565b14156103775760405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152606401610147565b600281600481111561038b5761038b610884565b14156103d95760405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152606401610147565b60038160048111156103ed576103ed610884565b14156104615760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610147565b600481600481111561047557610475610884565b14156104e95760405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202776272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152608401610147565b50565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083111561052357506000905060036105dd565b8460ff16601b1415801561053b57508460ff16601c14155b1561054c57506000905060046105dd565b6040805160008082526020820180845289905260ff881692820192909252606081018690526080810185905260019060a0016020604051602081039080840390855afa1580156105a0573d6000803e3d6000fd5b5050604051601f19015191505073ffffffffffffffffffffffffffffffffffffffff81166105d6576000600192509250506105dd565b9150600090505b94509492505050565b6000807f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff831660ff84901c601b01610620878288856104ec565b935093505050935093915050565b803573ffffffffffffffffffffffffffffffffffffffff8116811461065257600080fd5b919050565b6000806000806080858703121561066d57600080fd5b6106768561062e565b93506020850135925061068b6040860161062e565b9396929550929360600135925050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b604051610120810167ffffffffffffffff811182821017156106ee576106ee61069b565b60405290565b600082601f83011261070557600080fd5b813567ffffffffffffffff808211156107205761072061069b565b604051601f8301601f19908116603f011681019082821181831017156107485761074861069b565b8160405283815286602085880101111561076157600080fd5b836020870160208301376000602085830101528094505050505092915050565b6000806040838503121561079457600080fd5b823567ffffffffffffffff808211156107ac57600080fd5b9084019061012082870312156107c157600080fd5b6107c96106ca565b6107d28361062e565b81526107e06020840161062e565b60208201526107f16040840161062e565b60408201526108026060840161062e565b60608201526080830135608082015260a083013560a082015260c083013560c082015260e083013560e0820152610100808401358381111561084357600080fd5b61084f898287016106f4565b82840152505080945050602085013591508082111561086d57600080fd5b5061087a858286016106f4565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fdfea2646970667358221220a08633a1aaf58ab6de255458ada23e18ad89a75cae332e973227f1c045e5479964736f6c63430008090033";

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
