import { task } from 'hardhat/config'
import { HYDNSeal } from '../typechain-types'

task('getNextId', 'Get next id').setAction(async (taskArguments, hre) => {
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  const HYDNSealProxyDeployment = await hre.deployments.get('HYDNSeal')
  const HYDNSeal = (await hre.ethers.getContractAt('HYDNSeal', HYDNSealProxyDeployment.address, signer)) as HYDNSeal
  const nextId = (await HYDNSeal.totalAudits()).add(1).toString()
  console.info('Next id', nextId)
  return nextId
})
