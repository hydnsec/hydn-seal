import assert from 'assert'
import fs from 'fs'
import { task } from 'hardhat/config'
import { uploadImage } from '../modules/pinata'
import { sealGenerator } from '../modules/sealGenerator'
import sealsDataRaw from '../modules/seals.json'
const pathSeals = './modules/seals.json'

const seals: ISeal[] = sealsDataRaw
task('createSeal', 'Create seal').setAction(async (taskArguments, hre) => {
  console.info('Start generating seal image')
  const newSeal: ISeal = {
    id: await hre.run('getNextId'),
    chainId: 31337,
    projectName: 'project name 1',
    date: '88.07.2022',
    reportUrl: 'https://hydnsec.com',
    contracts: ['0xe912C2be7ce2Bcc4211e27e6fE9D01471aa00A36'],
  }
  const { chainId } = await hre.ethers.provider.getNetwork()
  assert(chainId === newSeal.chainId, 'Chain id invalid')
  const path = await sealGenerator(newSeal.date)
  console.info('upload image to ipfs', path)
  const ipfsHashImage = await uploadImage(path, newSeal.projectName)
  console.info('ipfsHashImage', ipfsHashImage)
  newSeal.ipfsHashImage = ipfsHashImage
  seals.push(newSeal)
  console.info('Write seal to file')
  fs.writeFileSync(pathSeals, JSON.stringify(seals, null, 2))
  console.info('write seal to file done')

  // const ipfsHashMetadata = await uploadMetadata(ipfsHashImage, audit.projectName, audit.reportUrl, audit.contracts)
  // console.info('ipfsHashMetadata', ipfsHashMetadata)
})
