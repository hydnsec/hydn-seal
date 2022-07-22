import { BigNumber } from 'ethers'
import { task } from 'hardhat/config'
import { uploadImage, uploadMetadata } from '../modules/pinata'
import { sealGenerator } from '../modules/sealGenerator'
import { HYDNSeal } from '../typechain-types'

interface IAudit {
  projectName: string
  date: string
  reportUrl: string
  contracts: string[]
}

const audit: IAudit = {
  projectName: 'project name 1',
  date: '18.07.2022',
  reportUrl: 'https://auditReportUrl1',
  contracts: ['0xe912C2be7ce2Bcc4211e27e6fE9D01471aa00A36'],
}

task('mint', 'Mint seal').setAction(async (taskArguments, hre) => {
  console.info('Start generating seal image')
  const path = await sealGenerator(audit.date)
  console.info('upload image to ipfs', path)
  const ipfsHashImage = await uploadImage(path, audit.projectName)
  console.info('ipfsHashImage', ipfsHashImage)
  const ipfsHashMetadata = await uploadMetadata(ipfsHashImage, audit.projectName, audit.reportUrl, audit.contracts)
  console.info('ipfsHashMetadata', ipfsHashMetadata)
  // const ipfsHashMetadata = 'ipfsHashMetadata' //test

  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  const HYDNSealProxyDeployment = await hre.deployments.get('HYDNSeal')
  const HYDNSeal = (await hre.ethers.getContractAt('HYDNSeal', HYDNSealProxyDeployment.address, signer)) as HYDNSeal
  console.info('Minting token...')
  const tx = await HYDNSeal.mintSeal(audit.contracts, ipfsHashMetadata, {
    gasPrice: BigNumber.from(hre.config.networks[hre.network.name].gasPrice),
  })
  console.info(`Minting token wait tx ${tx.hash}`)
  await tx.wait()
  console.info(`Mint done ${tx.hash}`)
})
