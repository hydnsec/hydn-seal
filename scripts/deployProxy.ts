import hre from 'hardhat'
import { wait } from '../modules/utils'

async function main() {
  const { save } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)

  const HYDNSeal = await hre.ethers.getContractFactory('HYDNSeal', signer)
  console.info('Deploying proxy...')
  const proxy = await hre.upgrades.deployProxy(HYDNSeal, ['https://hydnsec.com/api/seals/'], {
    kind: 'uups',
    timeout: 0,
    pollingInterval: 10000,
  })
  console.info(`Deploying proxy wait tx ${proxy.deployTransaction.hash}...`)
  await proxy.deployTransaction.wait()
  console.info(`HYDNSeal proxy done ${proxy.address}`)

  console.info('Upgrading proxy implementation...')
  const implTx = await hre.upgrades.upgradeProxy(proxy, HYDNSeal, {
    kind: 'uups',
    timeout: 0,
    pollingInterval: 10000,
  })
  console.info(`Upgrading proxy implementation wait tx ${implTx.deployTransaction.hash}...`)
  await implTx.deployTransaction.wait()
  const implAddress = await hre.upgrades.erc1967.getImplementationAddress(proxy.address)
  console.info(`HYDNSeal impl ${implAddress}`)

  const artifact = await hre.deployments.getExtendedArtifact('HYDNSeal')
  const proxyDeployments = {
    address: proxy.address,
    ...artifact,
  }

  console.info('Saving artifacts...')
  await save('HYDNSeal', proxyDeployments)
  console.info('Save artifacts done')

  if (!['localhost', 'hardhat'].includes(hre.network.name)) {
    console.info('Verifying...')
    await wait(10000)
    await hre.run('verify:verify', {
      address: implAddress,
      constructorArguments: [],
    })
  }
}

main().catch((error) => console.error('Deploy proxy error: ', error))
