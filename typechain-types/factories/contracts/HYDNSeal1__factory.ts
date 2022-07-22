/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import { Contract, ContractFactory, Overrides, Signer, utils } from "ethers";
import type { PromiseOrValue } from "../../common";
import type { HYDNSeal1, HYDNSeal1Interface } from "../../contracts/HYDNSeal1";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address",
      },
    ],
    name: "AdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "ApprovalForAll",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address",
      },
    ],
    name: "BeaconUpgraded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "values",
        type: "uint256[]",
      },
    ],
    name: "TransferBatch",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "TransferSingle",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "value",
        type: "string",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "URI",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "accounts",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
    ],
    name: "balanceOfBatch",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
    ],
    name: "isApprovedForAll",
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
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "proxiableUUID",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256[]",
        name: "ids",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "amounts",
        type: "uint256[]",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeBatchTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "safeTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "operator",
        type: "address",
      },
      {
        internalType: "bool",
        name: "approved",
        type: "bool",
      },
    ],
    name: "setApprovalForAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
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
  {
    inputs: [],
    name: "test",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes",
      },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
    ],
    name: "uri",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x60a0604052346100db573060805260ff345460081c1661008657345460ff8082161061004c575b60405161237d90816100e1823960805181818161093c01528181610a7d0152610dbd0152f35b60ff908119161734557f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb3847402498602060405160ff8152a138610026565b60405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b6064820152608490fd5b600080fdfe6080604052600436101561001257600080fd5b60003560e01c8062fdd58e146115e357806301ffc9a7146115115780630e89341c146112245780632eb2c2d614610e415780633659cfe614610d6c5780634e1273f414610af45780634f1ef28614610a1057806352d1902d14610914578063715018a6146108f15780638129fc1c146107d95780638da5cb5b146107a5578063a22cb46514610667578063e985e9c5146105b8578063f242432a146101bd578063f2fde38b146100ef5763f8a8fd6d146100cb57600080fd5b346100ea5760006003193601126100ea57602061016054604051908152f35b600080fd5b346100ea5760206003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff81168082036100ea57610129611822565b1561013957610137906118a2565b005b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602660248201527f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160448201527f64647265737300000000000000000000000000000000000000000000000000006064820152fd5b346100ea5760a06003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff8116908181036100ea576024359173ffffffffffffffffffffffffffffffffffffffff83168084036100ea57604435916064359460843567ffffffffffffffff81116100ea5761023d61024f9136906004016117a7565b9533841490811561055f575b50611ff8565b61025a831515612083565b610263846122af565b5061026d866122af565b508360005260fb6020526040600020826000526020526040600020546102958782101561210e565b600085815260fb60209081526040808320868452909152808220928990039092558481522080546102c7908890612199565b905582826040518681528860208201527fc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f6260403392a43b61030457005b600061035d60209560405197889687957ff23a6e6100000000000000000000000000000000000000000000000000000000875233600488015260248701526044860152606485015260a0608485015260a48401906121dd565b92825a940393f16000918161052f575b506104605750600161037d612219565b6308c379a014610417575b61038e57005b6040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603460248201527f455243313135353a207472616e7366657220746f206e6f6e204552433131353560448201527f526563656976657220696d706c656d656e7465720000000000000000000000006064820152608490fd5b0390fd5b61041f612237565b8061042a5750610388565b610413906040519182917f08c379a000000000000000000000000000000000000000000000000000000000835260048301611660565b7fffffffff000000000000000000000000000000000000000000000000000000007ff23a6e610000000000000000000000000000000000000000000000000000000091160315610137576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608490fd5b61055191925060203d8111610558575b61054981836116aa565b8101906121a5565b908261036d565b503d61053f565b6105b29150339073ffffffffffffffffffffffffffffffffffffffff1660005260fc60205273ffffffffffffffffffffffffffffffffffffffff6040600020911660005260205260ff6040600020541690565b88610249565b346100ea5760406003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff811681036100ea576024359073ffffffffffffffffffffffffffffffffffffffff821682036100ea5760209161065d9173ffffffffffffffffffffffffffffffffffffffff1660005260fc60205273ffffffffffffffffffffffffffffffffffffffff6040600020911660005260205260ff6040600020541690565b6040519015158152f35b346100ea5760406003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff81168091036100ea576024358015158091036100ea57813314610721573360005260fc602052604060002082600052602052604060002080547fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff0060ff841691161790556040519081527f17307eab39ab6107e8899845ad3d59bd9653f200f220920489ca2b5937696c3160203392a3005b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f455243313135353a2073657474696e6720617070726f76616c2073746174757360448201527f20666f722073656c6600000000000000000000000000000000000000000000006064820152fd5b346100ea5760006003193601126100ea57602060975473ffffffffffffffffffffffffffffffffffffffff60405191168152f35b346100ea5760006003193601126100ea5760005460ff8160081c1615806108e4575b156108605760026101608190557fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff00009190911681176000556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb384740249890602090a1005b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201527f647920696e697469616c697a65640000000000000000000000000000000000006064820152fd5b50600260ff8216106107fb565b346100ea5760006003193601126100ea5761090a611822565b61013760006118a2565b346100ea5760006003193601126100ea5773ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016300361098c5760206040517f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc8152f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152603860248201527f555550535570677261646561626c653a206d757374206e6f742062652063616c60448201527f6c6564207468726f7567682064656c656761746563616c6c00000000000000006064820152fd5b60406003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff811681036100ea5760243567ffffffffffffffff81116100ea5761013791610a6260019236906004016117a7565b90610ae773ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016610aa98130141561192b565b73ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5416146119b6565b610aef611822565b611a41565b346100ea5760406003193601126100ea5760043567ffffffffffffffff81116100ea57366023820112156100ea5780600401359067ffffffffffffffff8211610d3d578160051b9060405192610b4d60208401856116aa565b835260246020840192820101903682116100ea57602401915b818310610d10578360243567ffffffffffffffff81116100ea57610b8e903690600401611703565b908051825103610c8c5780517fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0610bdd610bc7836116eb565b92610bd560405194856116aa565b8084526116eb565b0136602083013760005b825181108015610c725715610c435780610c2e6020610c3e9360051b8601015173ffffffffffffffffffffffffffffffffffffffff610c268489611fe4565b519116611eca565b610c388285611fe4565b52611f88565b610be7565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b60405160208082528190610c88908201866117ee565b0390f35b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f455243313135353a206163636f756e747320616e6420696473206c656e67746860448201527f206d69736d6174636800000000000000000000000000000000000000000000006064820152fd5b823573ffffffffffffffffffffffffffffffffffffffff811681036100ea57815260209283019201610b66565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b346100ea5760206003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff811681036100ea57600061013791610de973ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000016610aa98130141561192b565b610df1611822565b610dfa8261176d565b90610e0860405192836116aa565b8282527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0610e358461176d565b01366020840137611a41565b346100ea5760a06003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff81168082036100ea576024359073ffffffffffffffffffffffffffffffffffffffff82168083036100ea5760443567ffffffffffffffff81116100ea57610eb5903690600401611703565b9360643567ffffffffffffffff81116100ea57610ed6903690600401611703565b9060843567ffffffffffffffff81116100ea57610efa610f0b9136906004016117a7565b9133861490811561055f5750611ff8565b85518251036111a057610f1f831515612083565b60005b8651811015610fbc5780610f39610fb79289611fe4565b51610f448286611fe4565b51908060005260fb602052604060002088600052602052604060002054610f6d8382101561210e565b8160005260fb6020526040600020896000526020528260406000209103905560005260fb602052604060002086600052602052610fb06040600020918254612199565b9055611f88565b610f22565b50949290938282604051604081527f4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb611009610ffb604084018a6117ee565b83810360208501528a6117ee565b918033930390a43b61101757005b600061109161106d9661107f602097604051998a9889977fbc197c810000000000000000000000000000000000000000000000000000000089523360048a0152602489015260a0604489015260a48801906117ee565b906003198783030160648801526117ee565b906003198583030160848601526121dd565b92825a940393f160009181611180575b506110b15750600161037d612219565b7fffffffff000000000000000000000000000000000000000000000000000000007fbc197c810000000000000000000000000000000000000000000000000000000091160315610137576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f455243313135353a204552433131353552656365697665722072656a6563746560448201527f6420746f6b656e730000000000000000000000000000000000000000000000006064820152608490fd5b61119991925060203d81116105585761054981836116aa565b90826110a1565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602860248201527f455243313135353a2069647320616e6420616d6f756e7473206c656e6774682060448201527f6d69736d617463680000000000000000000000000000000000000000000000006064820152fd5b346100ea5760206003193601126100ea5760043560005261012e602052604060002060405160009181815493611259856122d8565b9283835260208301956001811690816000146114d4575060011461148d575b50611285925003826116aa565b8051600090156113a757506040519060009061012d546112a4816122d8565b9060018116908115611365575060011461130a575b50816112fe926112d1610c889686945193849161162b565b01037fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe081018352826116aa565b60405191829182611660565b90915061012d6000527f193a3ae4da5049eb74cee39e4cf5827f7ce7b1d1d1775ef1c6311eb60558e6d56000905b82821061134f575050820160200190610c886112b9565b6001816020925483858901015201910190611338565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660208087019190915282151590920285019091019250610c8890506112b9565b915050604051908060fd54906113bc826122d8565b808552916001811690811561144857506001146113eb575b5050906113e681610c889303826116aa565b6112fe565b60fd81527f9346ac6dd7de6b96975fec380d4d994c4c12e6a8897544f22915316cc6cca280939250905b80821061142e575090915081016020016113e6826113d4565b919260018160209254838588010152019101909291611415565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001660208087019190915292151560051b850190920192506113e691508390506113d4565b90506000929192526020600020906000915b8183106114b85750509060206112859282010185611278565b602091935080600191548385880101520191019091839261149f565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff001687525061128593151560051b83016020019150869050611278565b346100ea5760206003193601126100ea576004357fffffffff0000000000000000000000000000000000000000000000000000000081168091036100ea57807fd9b67a2600000000000000000000000000000000000000000000000000000000602092149081156115b9575b811561158f575b506040519015158152f35b7f01ffc9a70000000000000000000000000000000000000000000000000000000091501482611584565b7f0e89341c000000000000000000000000000000000000000000000000000000008114915061157d565b346100ea5760406003193601126100ea5760043573ffffffffffffffffffffffffffffffffffffffff811681036100ea5761162360209160243590611eca565b604051908152f35b918091926000905b82821061164b575011611644575050565b6000910152565b91508060209183015181860152018291611633565b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f604093602084526116a3815180928160208801526020888801910161162b565b0116010190565b90601f7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0910116810190811067ffffffffffffffff821117610d3d57604052565b67ffffffffffffffff8111610d3d5760051b60200190565b9080601f8301121590816100ea5782359161171d836116eb565b9361172b60405195866116aa565b83855260208086019460051b8201019283116100ea57602001925b828410611754575050505090565b81611769578335815260209384019301611746565b5080fd5b67ffffffffffffffff8111610d3d57601f017fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe01660200190565b81601f820112156100ea578035906117be8261176d565b926117cc60405194856116aa565b828452602083830101116100ea57816000926020809301838601378301015290565b906020808351928381520192019060005b81811061180c5750505090565b82518452602093840193909201916001016117ff565b60975473ffffffffffffffffffffffffffffffffffffffff3391160361184457565b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602060248201527f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e65726044820152fd5b7fffffffffffffffffffffffff0000000000000000000000000000000000000000906097549073ffffffffffffffffffffffffffffffffffffffff609754911692839116176097557f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e0600073ffffffffffffffffffffffffffffffffffffffff604051931692a3565b1561193257565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f64656c656761746563616c6c00000000000000000000000000000000000000006064820152fd5b156119bd57565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602c60248201527f46756e6374696f6e206d7573742062652063616c6c6564207468726f7567682060448201527f6163746976652070726f787900000000000000000000000000000000000000006064820152fd5b9060ff7f4910fdfa16fed3260ed0e7147f7cc6da11a60208b5b9406d12a635614ffd91435416600014611a7b5750611a799150611dbe565b565b604051927f52d1902d0000000000000000000000000000000000000000000000000000000084525a9360208160048173ffffffffffffffffffffffffffffffffffffffff88168099fa60009181611d88575b50611b565760846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602e60248201527f45524331393637557067726164653a206e657720696d706c656d656e7461746960448201527f6f6e206973206e6f7420555550530000000000000000000000000000000000006064820152fd5b7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc03611d0457611b8583611dbe565b604051937fbc7cd75a20ee27fd9adebab32041f755214dbc6bffa90cc0225b39da2e5c2d3b600086a281511590811591611cfc575b50611bc457505050565b600092823b15611c7a57509180809284611c6f95519160205a920191f4903d15611c72573d611bf28161176d565b90611c0060405192836116aa565b8152809160203d92013e5b60405191611c1a6060846116aa565b602783527f416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c60208401527f206661696c656400000000000000000000000000000000000000000000000000604084015261232b565b50565b506060611c0b565b807f08c379a0000000000000000000000000000000000000000000000000000000006084925260206004820152602660248201527f416464726573733a2064656c65676174652063616c6c20746f206e6f6e2d636f60448201527f6e747261637400000000000000000000000000000000000000000000000000006064820152fd5b905038611bba565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602960248201527f45524331393637557067726164653a20756e737570706f727465642070726f7860448201527f6961626c655555494400000000000000000000000000000000000000000000006064820152fd5b90916020823d8211611db6575b81611da2602093836116aa565b81010312611db35750519038611acd565b80fd5b3d9150611d95565b803b15611e46577fffffffffffffffffffffffff000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff7f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc5492169116177f360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc55565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602d60248201527f455243313936373a206e657720696d706c656d656e746174696f6e206973206e60448201527f6f74206120636f6e7472616374000000000000000000000000000000000000006064820152fd5b73ffffffffffffffffffffffffffffffffffffffff16908115611f045760005260fb60205260406000209060005260205260406000205490565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f455243313135353a2061646472657373207a65726f206973206e6f742061207660448201527f616c6964206f776e6572000000000000000000000000000000000000000000006064820152fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114611fb55760010190565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b8051821015610c435760209160051b010190565b15611fff57565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602f60248201527f455243313135353a2063616c6c6572206973206e6f7420746f6b656e206f776e60448201527f6572206e6f7220617070726f76656400000000000000000000000000000000006064820152fd5b1561208a57565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602560248201527f455243313135353a207472616e7366657220746f20746865207a65726f20616460448201527f64726573730000000000000000000000000000000000000000000000000000006064820152fd5b1561211557565b60846040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152602a60248201527f455243313135353a20696e73756666696369656e742062616c616e636520666f60448201527f72207472616e73666572000000000000000000000000000000000000000000006064820152fd5b81198111611fb5570190565b908160209103126100ea57517fffffffff00000000000000000000000000000000000000000000000000000000811681036100ea5790565b907fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f6020936116a38151809281875287808801910161162b565b60009060033d1161222657565b905060046000803e60005160e01c90565b600060443d1061229e576040516003193d016004823e8051913d602484011167ffffffffffffffff8411176122a9578282019283519167ffffffffffffffff83116122a1576003193d850101602084870101116122a1575061229e929101602001906116aa565b90565b949350505050565b92915050565b604051906122be6040836116aa565b60018252602036818401376122d4600083611fe4565b5290565b90600182811c92168015612321575b60208310146122f257565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b91607f16916122e7565b90919015612337575090565b81511561042a5750805190602001fdfea2646970667358221220a37a9ddbeee12f0e5fc567782de46c03129623d2198d0563bd2509b57df80cdf64736f6c634300080f0033";

type HYDNSeal1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: HYDNSeal1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class HYDNSeal1__factory extends ContractFactory {
  constructor(...args: HYDNSeal1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<HYDNSeal1> {
    return super.deploy(overrides || {}) as Promise<HYDNSeal1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): HYDNSeal1 {
    return super.attach(address) as HYDNSeal1;
  }
  override connect(signer: Signer): HYDNSeal1__factory {
    return super.connect(signer) as HYDNSeal1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): HYDNSeal1Interface {
    return new utils.Interface(_abi) as HYDNSeal1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): HYDNSeal1 {
    return new Contract(address, _abi, signerOrProvider) as HYDNSeal1;
  }
}
