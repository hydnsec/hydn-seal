import assert from 'assert'
import { BigNumber } from 'ethers'
import { task } from 'hardhat/config'
import sealsDataRaw from '../modules/seals.json'
import { HYDNSeal } from '../typechain-types'

const seals: ISeal[] = sealsDataRaw

task('mint', 'Mint seal').setAction(async (taskArguments, hre) => {
  console.info('Start generating seal mint')
  const nextId = await hre.run('getNextId')
  const sealToMint = seals.find((seal) => seal.id === nextId)
  if (!sealToMint) {
    throw new Error(`missing next id data ${nextId}`)
  }
  const { chainId } = await hre.ethers.provider.getNetwork()
  assert(chainId === sealToMint.chainId, 'Chain id invalid')
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  const HYDNSealProxyDeployment = await hre.deployments.get('HYDNSeal')
  const HYDNSeal = (await hre.ethers.getContractAt('HYDNSeal', HYDNSealProxyDeployment.address, signer)) as HYDNSeal
  console.info('Minting token...')
  const tx = await HYDNSeal.mintSeal(sealToMint.contracts, {
    gasPrice: BigNumber.from(hre.config.networks[hre.network.name].gasPrice),
  })
  console.info(`Minting token wait tx ${tx.hash}`)
  await tx.wait()
  console.info(`Mint done ${tx.hash}`)
})
