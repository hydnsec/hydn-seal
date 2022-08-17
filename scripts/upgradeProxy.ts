import hre from 'hardhat'
import { wait } from '../modules/utils'

async function main() {
  const { save } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  const HYDNSealProxyDeployment = await hre.deployments.get('HYDNSeal')
  const HYDNSeal1 = await hre.ethers.getContractFactory('HYDNSeal', signer)
  console.info('Upgrading proxy implementation...')
  const upgradeProxy = await hre.upgrades.upgradeProxy(HYDNSealProxyDeployment.address, HYDNSeal1, {
    kind: 'uups',
    call: {
      fn: 'initialize',
      args: ['https://hydnsec.com/api/seals/'],
    },
    timeout: 0,
    pollingInterval: 10000,
  })
  await upgradeProxy.deployTransaction.wait()
  console.info(`Upgrade proxy done ${upgradeProxy.address}`)
  const implAddress = await hre.upgrades.erc1967.getImplementationAddress(HYDNSealProxyDeployment.address)
  console.info(`HYDNSeal new impl ${implAddress}`)

  const artifact = await hre.deployments.getExtendedArtifact('HYDNSeal')
  const proxyDeployments = {
    address: upgradeProxy.address,
    ...artifact,
  }

  console.info('Saving artifacts...')
  await save('HYDNSeal', proxyDeployments)
  console.info('Save artifacts done')

  if (!['localhost', 'hardhat'].includes(hre.network.name)) {
    console.info('Verifying')
    await wait(20000)
    await hre.run('verify:verify', {
      address: implAddress,
      constructorArguments: [],
    })
  }
}

main().catch((error) => console.error('Deploy proxy error: ', error))
