import hre from 'hardhat'
import { wait } from '../modules/utils'

async function main() {
  const { save } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)

  const HYDNSeal = await hre.ethers.getContractFactory('HYDNSeal', signer)
  console.info('Deploying proxy')
  const proxy = await hre.upgrades.deployProxy(HYDNSeal, {
    kind: 'uups',
    timeout: 0,
    pollingInterval: 10000,
  })
  await proxy.deployTransaction.wait()
  console.info(`HYDNSeal proxy ${proxy.address}`)

  console.info('Upgrade proxy implementation')
  const implTx = await hre.upgrades.upgradeProxy(proxy, HYDNSeal, {
    timeout: 0,
    pollingInterval: 10000,
  })
  await implTx.deployTransaction.wait()
  const implAddress = await hre.upgrades.erc1967.getImplementationAddress(proxy.address)
  console.info(`HYDNSeal impl ${implAddress}`)

  const artifact = await hre.deployments.getExtendedArtifact('HYDNSeal')
  const proxyDeployments = {
    address: proxy.address,
    ...artifact,
  }

  console.info('Save artifacts')
  await save('HYDNSeal', proxyDeployments)
  console.info('Save artifacts done')

  await wait(10000)
  console.info('Verifying')
  if (!['localhost', 'hardhat'].includes(hre.network.name)) {
    await hre.run('verify:verify', {
      address: implAddress,
      constructorArguments: [],
    })
  }
}

main().catch((error) => console.error('Deploy proxy error: ', error))
