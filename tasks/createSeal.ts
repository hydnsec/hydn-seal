import assert from 'assert'
import { BigNumber, utils } from 'ethers'
import fs from 'fs'
import { task } from 'hardhat/config'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { uploadImage } from '../modules/pinata'
import { sealGenerator } from '../modules/sealGenerator'
import sealsDataRaw from '../modules/seals.json'
const pathSeals = './modules/seals.json'

//bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)) - 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc
const proxyImplementationSlot = utils.hexlify(
  BigNumber.from(utils.keccak256(utils.toUtf8Bytes('eip1967.proxy.implementation'))).sub(1)
)
const seals: ISeal[] = sealsDataRaw

async function checkProxyContract(hre: HardhatRuntimeEnvironment, sealContract: SealContract) {
  console.info(`Check proxy EIP1967 code ${sealContract.address}`)
  assert(sealContract.implementation, `Missing implementation for ${sealContract.address}`)
  assert(
    utils.getAddress(sealContract.implementation) === sealContract.implementation,
    `Address implementation checksum invalid for ${sealContract.address}`
  )
  const codeProxy = await hre.ethers.provider.getCode(sealContract.address)
  assert(codeProxy !== '0x', `Code proxy is empty for ${sealContract.address}`)
  const proxyImplementationRaw = await hre.ethers.provider.getStorageAt(sealContract.address, proxyImplementationSlot)
  assert(
    proxyImplementationRaw !== hre.ethers.constants.HashZero,
    `Implementation slot empty for ${sealContract.address}`
  )
  const proxyImplementation = utils.getAddress(utils.hexStripZeros(proxyImplementationRaw))
  assert(
    proxyImplementation === sealContract.implementation,
    `Implementation mismatch for ${sealContract.implementation}`
  )
  console.info(`Set codeHash for proxy ${sealContract.address}`)
  sealContract.codeHash = utils.keccak256(codeProxy)
  const codeImplementation = await hre.ethers.provider.getCode(sealContract.implementation)
  assert(codeImplementation !== '0x', 'Code implementation is empty')
  console.info(`Set codeHash for implementation ${sealContract.implementation}`)
  sealContract.implementationCodeHash = utils.keccak256(codeImplementation)
}

async function checkContract(hre: HardhatRuntimeEnvironment, sealContract: SealContract) {
  console.info('Check raw contract code')
  const code = await hre.ethers.provider.getCode(sealContract.address)
  assert(code !== '0x', `Code is empty for ${sealContract.address}`)
  const proxyImplementationRaw = await hre.ethers.provider.getStorageAt(sealContract.address, proxyImplementationSlot)
  assert(
    proxyImplementationRaw === hre.ethers.constants.HashZero,
    `Contract must be considered as proxy ${sealContract.address}`
  )
  console.info(`Set codeHash for contract ${sealContract.address}`)
  sealContract.codeHash = utils.keccak256(code)
}

task('createSeal', 'Create seal').setAction(async (taskArguments, hre) => {
  console.info('Start generating seal image')
  const newSeal: ISeal = {
    id: await hre.run('getNextId'),
    chainId: 31337,
    projectName: 'project name 1',
    date: '88.07.2022',
    reportUrl: 'https://hydnsec.com',
    contracts: [
      {
        isProxyEIP1967: true,
        address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
        implementation: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
      },
    ],
  }
  const existing = seals.find((seal) =>
    seal.contracts.find((sealContract) =>
      newSeal.contracts.find((newSealContract) => newSealContract.address === sealContract.address)
    )
  )
  if (existing) {
    throw new Error(`Contract already exist ${existing.projectName}`)
  }
  const { chainId } = await hre.ethers.provider.getNetwork()
  assert(chainId === newSeal.chainId, 'Chain id invalid')
  await Promise.all(
    newSeal.contracts.map((sealContract) => {
      assert(
        utils.getAddress(sealContract.address) === sealContract.address,
        `Address checksum invalid for ${sealContract.address}`
      )
      if (sealContract.isProxyEIP1967) {
        return checkProxyContract(hre, sealContract)
      } else {
        return checkContract(hre, sealContract)
      }
    })
  )

  const path = await sealGenerator(newSeal.date)
  console.info('upload image to ipfs', path)
  const ipfsHashImage = await uploadImage(path, newSeal.projectName)
  console.info('ipfsHashImage', ipfsHashImage)
  newSeal.ipfsHashImage = ipfsHashImage
  seals.push(newSeal)
  // const ipfsHashMetadata = await uploadMetadata(ipfsHashImage, newSeal.projectName, newSeal.reportUrl, newSeal.contracts)
  // console.info('ipfsHashMetadata', ipfsHashMetadata)
  console.info('Write seal to file')
  fs.writeFileSync(pathSeals, JSON.stringify(seals, null, 2))
  console.info('write seal to file done')
})
