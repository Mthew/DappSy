export default {
  compiler: {
    version: "0.8.22+commit.4fc1097e",
  },
  language: "Solidity",
  output: {
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "initialOwner",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "balance",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "needed",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256",
          },
        ],
        name: "ERC1155InsufficientBalance",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "approver",
            type: "address",
          },
        ],
        name: "ERC1155InvalidApprover",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "uint256",
            name: "idsLength",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "valuesLength",
            type: "uint256",
          },
        ],
        name: "ERC1155InvalidArrayLength",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
        ],
        name: "ERC1155InvalidOperator",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "receiver",
            type: "address",
          },
        ],
        name: "ERC1155InvalidReceiver",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "sender",
            type: "address",
          },
        ],
        name: "ERC1155InvalidSender",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "operator",
            type: "address",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "ERC1155MissingApprovalForAll",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        name: "OwnableInvalidOwner",
        type: "error",
      },
      {
        inputs: [
          {
            internalType: "address",
            name: "account",
            type: "address",
          },
        ],
        name: "OwnableUnauthorizedAccount",
        type: "error",
      },
      {
        anonymous: false,
        inputs: [
          {
            indexed: true,
            internalType: "address",
            name: "_owner",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_projectID",
            type: "uint256",
          },
        ],
        name: "Add",
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
            name: "_from",
            type: "address",
          },
          {
            indexed: true,
            internalType: "address",
            name: "_to",
            type: "address",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "_projectID",
            type: "uint256",
          },
          {
            indexed: false,
            internalType: "uint256",
            name: "tokenCount",
            type: "uint256",
          },
        ],
        name: "Transfer",
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
        inputs: [
          {
            internalType: "string",
            name: "projectKey",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenCount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "projectPrice",
            type: "uint256",
          },
        ],
        name: "createProject",
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
        inputs: [
          {
            internalType: "uint256",
            name: "",
            type: "uint256",
          },
        ],
        name: "projects",
        outputs: [
          {
            internalType: "string",
            name: "projectKey",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "tokenCost",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "projectID",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "originalOwner",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "tokenAvalibles",
            type: "uint256",
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
            name: "values",
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
            name: "value",
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
        name: "totalProjectsCounter",
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
            internalType: "uint256",
            name: "_projectID",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "tokensToSell",
            type: "uint256",
          },
        ],
        name: "transfer",
        outputs: [],
        stateMutability: "payable",
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
            internalType: "uint256",
            name: "",
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
    ],
    devdoc: {
      errors: {
        "ERC1155InsufficientBalance(address,uint256,uint256,uint256)": [
          {
            details:
              "Indicates an error related to the current `balance` of a `sender`. Used in transfers.",
            params: {
              balance: "Current balance for the interacting account.",
              needed: "Minimum amount required to perform a transfer.",
              sender: "Address whose tokens are being transferred.",
              tokenId: "Identifier number of a token.",
            },
          },
        ],
        "ERC1155InvalidApprover(address)": [
          {
            details:
              "Indicates a failure with the `approver` of a token to be approved. Used in approvals.",
            params: {
              approver: "Address initiating an approval operation.",
            },
          },
        ],
        "ERC1155InvalidArrayLength(uint256,uint256)": [
          {
            details:
              "Indicates an array length mismatch between ids and values in a safeBatchTransferFrom operation. Used in batch transfers.",
            params: {
              idsLength: "Length of the array of token identifiers",
              valuesLength: "Length of the array of token amounts",
            },
          },
        ],
        "ERC1155InvalidOperator(address)": [
          {
            details:
              "Indicates a failure with the `operator` to be approved. Used in approvals.",
            params: {
              operator:
                "Address that may be allowed to operate on tokens without being their owner.",
            },
          },
        ],
        "ERC1155InvalidReceiver(address)": [
          {
            details:
              "Indicates a failure with the token `receiver`. Used in transfers.",
            params: {
              receiver: "Address to which tokens are being transferred.",
            },
          },
        ],
        "ERC1155InvalidSender(address)": [
          {
            details:
              "Indicates a failure with the token `sender`. Used in transfers.",
            params: {
              sender: "Address whose tokens are being transferred.",
            },
          },
        ],
        "ERC1155MissingApprovalForAll(address,address)": [
          {
            details:
              "Indicates a failure with the `operator`’s approval. Used in transfers.",
            params: {
              operator:
                "Address that may be allowed to operate on tokens without being their owner.",
              owner: "Address of the current owner of a token.",
            },
          },
        ],
        "OwnableInvalidOwner(address)": [
          {
            details:
              "The owner is not a valid owner account. (eg. `address(0)`)",
          },
        ],
        "OwnableUnauthorizedAccount(address)": [
          {
            details:
              "The caller account is not authorized to perform an operation.",
          },
        ],
      },
      events: {
        "ApprovalForAll(address,address,bool)": {
          details:
            "Emitted when `account` grants or revokes permission to `operator` to transfer their tokens, according to `approved`.",
        },
        "TransferBatch(address,address,address,uint256[],uint256[])": {
          details:
            "Equivalent to multiple {TransferSingle} events, where `operator`, `from` and `to` are the same for all transfers.",
        },
        "TransferSingle(address,address,address,uint256,uint256)": {
          details:
            "Emitted when `value` amount of tokens of type `id` are transferred from `from` to `to` by `operator`.",
        },
        "URI(string,uint256)": {
          details:
            "Emitted when the URI for token type `id` changes to `value`, if it is a non-programmatic URI. If an {URI} event was emitted for `id`, the standard https://eips.ethereum.org/EIPS/eip-1155#metadata-extensions[guarantees] that `value` will equal the value returned by {IERC1155MetadataURI-uri}.",
        },
      },
      kind: "dev",
      methods: {
        "balanceOf(address,uint256)": {
          details: "See {IERC1155-balanceOf}.",
        },
        "balanceOfBatch(address[],uint256[])": {
          details:
            "See {IERC1155-balanceOfBatch}. Requirements: - `accounts` and `ids` must have the same length.",
        },
        "isApprovedForAll(address,address)": {
          details: "See {IERC1155-isApprovedForAll}.",
        },
        "owner()": {
          details: "Returns the address of the current owner.",
        },
        "renounceOwnership()": {
          details:
            "Leaves the contract without owner. It will not be possible to call `onlyOwner` functions. Can only be called by the current owner. NOTE: Renouncing ownership will leave the contract without an owner, thereby disabling any functionality that is only available to the owner.",
        },
        "safeBatchTransferFrom(address,address,uint256[],uint256[],bytes)": {
          details: "See {IERC1155-safeBatchTransferFrom}.",
        },
        "safeTransferFrom(address,address,uint256,uint256,bytes)": {
          details: "See {IERC1155-safeTransferFrom}.",
        },
        "setApprovalForAll(address,bool)": {
          details: "See {IERC1155-setApprovalForAll}.",
        },
        "supportsInterface(bytes4)": {
          details: "See {IERC165-supportsInterface}.",
        },
        "transferOwnership(address)": {
          details:
            "Transfers ownership of the contract to a new account (`newOwner`). Can only be called by the current owner.",
        },
        "uri(uint256)": {
          details:
            "See {IERC1155MetadataURI-uri}. This implementation returns the same URI for *all* token types. It relies on the token type ID substitution mechanism https://eips.ethereum.org/EIPS/eip-1155#metadata[defined in the EIP]. Clients calling this function must replace the `\\{id\\}` substring with the actual token type ID.",
        },
      },
      version: 1,
    },
    userdoc: {
      kind: "user",
      methods: {},
      version: 1,
    },
  },
  settings: {
    compilationTarget: {
      "contract-2e50a438ba.sol": "Dappsy",
    },
    evmVersion: "shanghai",
    libraries: {},
    metadata: {
      bytecodeHash: "ipfs",
    },
    optimizer: {
      enabled: false,
      runs: 200,
    },
    remappings: [],
  },
  sources: {
    "@openzeppelin/contracts@5.0.0/access/Ownable.sol": {
      keccak256:
        "0xff6d0bb2e285473e5311d9d3caacb525ae3538a80758c10649a4d61029b017bb",
      license: "MIT",
      urls: [
        "bzz-raw://8ed324d3920bb545059d66ab97d43e43ee85fd3bd52e03e401f020afb0b120f6",
        "dweb:/ipfs/QmfEckWLmZkDDcoWrkEvMWhms66xwTLff9DDhegYpvHo1a",
      ],
    },
    "@openzeppelin/contracts@5.0.0/interfaces/draft-IERC6093.sol": {
      keccak256:
        "0x60c65f701957fdd6faea1acb0bb45825791d473693ed9ecb34726fdfaa849dd7",
      license: "MIT",
      urls: [
        "bzz-raw://ea290300e0efc4d901244949dc4d877fd46e6c5e43dc2b26620e8efab3ab803f",
        "dweb:/ipfs/QmcLLJppxKeJWqHxE2CUkcfhuRTgHSn8J4kijcLa5MYhSt",
      ],
    },
    "@openzeppelin/contracts@5.0.0/token/ERC1155/ERC1155.sol": {
      keccak256:
        "0xd9b0b8ee1ac6dfee14eb1ad4383a4739dbaa0f2036594bb3a16f0408085dadde",
      license: "MIT",
      urls: [
        "bzz-raw://6309805132e519162d1134c67df22dd963323a9208b4f41344a4c13ed63c1026",
        "dweb:/ipfs/QmTBPHnf6qbtAD4NVnKVFmubUHRqMDPLkseR6apxTUpsQo",
      ],
    },
    "@openzeppelin/contracts@5.0.0/token/ERC1155/IERC1155.sol": {
      keccak256:
        "0xe64b3445a3f638890af7ad92464cd18f1f202a2f5a7ed42dabf74317bae43303",
      license: "MIT",
      urls: [
        "bzz-raw://6620b77b8dcd786149534b1c664f94ff1f8bb1ad141e8da7d9ec64b9624c73f0",
        "dweb:/ipfs/QmVWHh5UvQ7PxRUtUNfd94mSxxxStuzV1NBZtLiKqKpBrQ",
      ],
    },
    "@openzeppelin/contracts@5.0.0/token/ERC1155/IERC1155Receiver.sol": {
      keccak256:
        "0xb69597a63b202e28401128bed6a6d259e8730191274471af7303eafb247881a3",
      license: "MIT",
      urls: [
        "bzz-raw://25addbda49a578b3318130585601344c5149a5549d749adf88e9685349a46b23",
        "dweb:/ipfs/Qme2DuD8gpsve1ZvaSMQpBwMdpU7yAtekDwr7gUp8dX4zX",
      ],
    },
    "@openzeppelin/contracts@5.0.0/token/ERC1155/extensions/IERC1155MetadataURI.sol":
      {
        keccak256:
          "0xe92b5e199b963d108ad6e06feeede151ba23849e0d064956535489ff967ffe68",
        license: "MIT",
        urls: [
          "bzz-raw://280e17738a67b06dae02fec32982bd48a8ab71d8df95e9975ae03532634bc522",
          "dweb:/ipfs/QmecjsNcFgy2mMjuNfRDkLpAYMRWnh5o73fw1Bj2rCso2z",
        ],
      },
    "@openzeppelin/contracts@5.0.0/utils/Arrays.sol": {
      keccak256:
        "0x8806d620b6571932b662cfd48fbd518d4f70df1f88a23b5724cacde64a77bda1",
      license: "MIT",
      urls: [
        "bzz-raw://8043304c8f9e1c1dc4a41935efa067daa77ad7abbae1fda41f015d53fbf327a5",
        "dweb:/ipfs/QmTrF2hSkRZoN9EEu8zdEhBpGNZ7RxzCdXf9ydzc2HQ3tM",
      ],
    },
    "@openzeppelin/contracts@5.0.0/utils/Context.sol": {
      keccak256:
        "0x75a4ee64c68dbd5f38bddd06e664a64c8271b4caa554fb6f0607dfd672bb4bf3",
      license: "MIT",
      urls: [
        "bzz-raw://0c4e6cb30d3601e2f7af5af09e265508147cb275a8dcd99d6f7363645cc56867",
        "dweb:/ipfs/QmNgFkoXNWoUbAyw71rr1sKQ95Rj2GfvYiWg79xEYDn2NY",
      ],
    },
    "@openzeppelin/contracts@5.0.0/utils/StorageSlot.sol": {
      keccak256:
        "0x32ba59b4b7299237c8ba56319110989d7978a039faf754793064e967e5894418",
      license: "MIT",
      urls: [
        "bzz-raw://1ae50c8b562427df610cc4540c9bf104acca7ef8e2dcae567ae7e52272281e9c",
        "dweb:/ipfs/QmTHiadFCSJUPpRjNegc5SahmeU8bAoY8i9Aq6tVscbcKR",
      ],
    },
    "@openzeppelin/contracts@5.0.0/utils/introspection/ERC165.sol": {
      keccak256:
        "0x9e8778b14317ba9e256c30a76fd6c32b960af621987f56069e1e819c77c6a133",
      license: "MIT",
      urls: [
        "bzz-raw://1777404f1dcd0fac188e55a288724ec3c67b45288e49cc64723e95e702b49ab8",
        "dweb:/ipfs/QmZFdC626GButBApwDUvvTnUzdinevC3B24d7yyh57XkiA",
      ],
    },
    "@openzeppelin/contracts@5.0.0/utils/introspection/IERC165.sol": {
      keccak256:
        "0x4296879f55019b23e135000eb36896057e7101fb7fb859c5ef690cf14643757b",
      license: "MIT",
      urls: [
        "bzz-raw://87b3541437c8c443ccd36795e56a338ed12855eec17f8da624511b8d1a7e14df",
        "dweb:/ipfs/QmeJQCtZrQjtJLr6u7ZHWeH3pBnjtLWzvRrKViAi7UZqxL",
      ],
    },
    "@openzeppelin/contracts@5.0.0/utils/math/Math.sol": {
      keccak256:
        "0x005ec64c6313f0555d59e278f9a7a5ab2db5bdc72a027f255a37c327af1ec02d",
      license: "MIT",
      urls: [
        "bzz-raw://4ece9f0b9c8daca08c76b6b5405a6446b6f73b3a15fab7ff56e296cbd4a2c875",
        "dweb:/ipfs/QmQyRpyPRL5SQuAgj6SHmbir3foX65FJjbVTTQrA2EFg6L",
      ],
    },
    "contract-2e50a438ba.sol": {
      keccak256:
        "0x7fab61228e90226c119dd16d8759977770d424707144d5e79278f77287f8ceff",
      license: "MIT",
      urls: [
        "bzz-raw://375ba6d4b16a0c0a5934c275a1ee5d17846493c42a1d7669ab9ae70763530b26",
        "dweb:/ipfs/QmbkLr3gEkWhuwjwoUv95EVro3VaGikG9ugAnEeS8DwMfy",
      ],
    },
  },
  version: 1,
};
