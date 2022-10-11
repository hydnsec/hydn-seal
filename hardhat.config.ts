import '@nomicfoundation/hardhat-toolbox'
import '@openzeppelin/hardhat-upgrades'
import 'dotenv/config'
import { parseUnits } from 'ethers/lib/utils'
import 'hardhat-deploy'
import { removeConsoleLog } from 'hardhat-preprocessor'
import 'hardhat-tracer'
import { HardhatUserConfig } from 'hardhat/types'
import './tasks/index'

// hardhat 0 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
const defaultPrivateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

// @ts-ignore
const config: HardhatUserConfig = {
  preprocess: {
    eachLine: removeConsoleLog((hre) => !['localhost', 'hardhat'].includes(hre.network.name)),
  },
  gasReporter: {
    currency: 'USD',
    enabled: true,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    gasPrice: 20, // in gwei
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    compilers: [
      {
        version: '0.8.2',
      },
      {
        version: '0.8.16',
        settings: {
          // evmVersion: 'berlin',
          // viaIR: true,
          optimizer: {
            enabled: true,
            runs: 20000,
            details: {
              // https://docs.soliditylang.org/en/latest/using-the-compiler.html#compiler-input-and-output-json-description
              peephole: true,
              inliner: true,
              jumpdestRemover: true,
              orderLiterals: false,
              deduplicate: true,
              cse: true,
              constantOptimizer: true,
              yulDetails: {
                optimizerSteps:
                  '[iMegsaxUlCficvOUcmMuifLDmjtvmOMjecIsDfrexTvhCCfMuLslOUrDhsjlmjfOCtMrnTvLUveeDLuTmUfDtgthOLfVr]',
              },
            },
          },
        },
      },
    ],
  },
  namedAccounts: {
    funder: 1,
    deployer: {
      localhost: 0,
      hardhat: 0,
      goerli: '0xe912C2be7ce2Bcc4211e27e6fE9D01471aa00A36',
      rinkeby: '0xe912C2be7ce2Bcc4211e27e6fE9D01471aa00A36',
      bsc: '0x34379d44Fc50dc40Aab4b1551d8b159388f53ed8',
      ethereum: '0x34379d44Fc50dc40Aab4b1551d8b159388f53ed8',
    },
  },
  networks: {
    localhost: {
      url: `http://127.0.0.1:8545`,
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [
        process.env.LOCAL_DEPLOYER_PRIVATE_KEY || defaultPrivateKey,
        '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
      ],
    },
    hardhat: {
      gasPrice: parseUnits('10', 'gwei').toNumber(),
    },

    bsc: {
      chainId: 56,
      url: 'https://rpc.ankr.com/bsc',
      hardfork: 'berlin',
      gasPrice: parseUnits('5.1', 'gwei').toNumber(),
      accounts: [process.env.BSC_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    bscTestnet: {
      chainId: 97,
      url: 'https://data-seed-prebsc-2-s1.binance.org:8545/',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.BSC_TESTNET_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },

    ethereum: {
      chainId: 1,
      url: 'https://rpc.ankr.com/eth',
      gasPrice: parseUnits('26', 'gwei').toNumber(),
      accounts: [process.env.ETHEREUM_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    goerli: {
      chainId: 5,
      url: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      gasPrice: parseUnits('2', 'gwei').toNumber(),
      accounts: [process.env.GOERLI_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    rinkeby: {
      chainId: 4,
      url: 'https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
      gasPrice: parseUnits('2', 'gwei').toNumber(),
      accounts: [process.env.RINKEBY_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },

    polygon: {
      chainId: 137,
      url: 'https://polygon-rpc.com',
      gasPrice: parseUnits('70', 'gwei').toNumber(),
      accounts: [process.env.POLYGON_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    mumbai: {
      chainId: 80001,
      url: 'https://rpc-mumbai.maticvigil.com',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.MUMBAI_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    ftm: {
      chainId: 250,
      url: 'https://rpc.ankr.com/fantom',
      gasPrice: parseUnits('50', 'gwei').toNumber(),
      accounts: [process.env.FTM_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    avalanche: {
      chainId: 43114,
      url: 'https://rpc.ankr.com/avalanche',
      gasPrice: parseUnits('30', 'gwei').toNumber(),
      accounts: [process.env.AVALANCE_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    moonriver: {
      chainId: 1285,
      url: 'https://rpc.moonriver.moonbeam.network',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.MOONRIVER_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    moonbeam: {
      chainId: 1284,
      url: 'https://rpc.api.moonbeam.network',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.HOO_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    xdai: {
      chainId: 100,
      url: 'https://rpc.ankr.com/gnosis',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.XDAI_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    optimism: {
      chainId: 10,
      url: 'https://mainnet.optimism.io',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.OPTIMISM_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    arbitrum: {
      chainId: 42161,
      url: 'https://arb1.arbitrum.io/rpc',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.ARBITRUM_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    heco: {
      chainId: 128,
      url: 'https://http-mainnet.hecochain.com/',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.HECO_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    hoo: {
      chainId: 70,
      url: 'https://http-mainnet.hoosmartchain.com',
      gasPrice: parseUnits('10', 'gwei').toNumber(),
      accounts: [process.env.HOO_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    aurora: {
      chainId: 1313161554,
      url: 'https://mainnet.aurora.dev',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.AURORA_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    celo: {
      chainId: 42220,
      url: 'https://celo-mainnet-rpc.allthatnode.com/',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.CELO_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    clv: {
      chainId: 1024,
      url: 'https://api-para.clover.finance',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.CLV_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    btt: {
      chainId: 199,
      url: 'https://rpc.bittorrentchain.io',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.BTT_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
    cronos: {
      chainId: 25,
      url: 'https://evm-cronos.crypto.org',
      gasPrice: parseUnits('1', 'gwei').toNumber(),
      accounts: [process.env.CRONOS_DEPLOYER_PRIVATE_KEY || defaultPrivateKey],
    },
  },
}

export default config
