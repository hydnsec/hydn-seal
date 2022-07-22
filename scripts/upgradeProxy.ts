import hre from 'hardhat'

async function main() {
  const { save } = hre.deployments
  const { deployer } = await hre.getNamedAccounts()
  const signer = await hre.ethers.getSigner(deployer)
  const HYDNSealProxyDeployment = await hre.deployments.get('HYDNSeal')
  const HYDNSeal1 = await hre.ethers.getContractFactory('HYDNSeal1', signer)
  console.info('Upgrade proxy implementation')
  const upgradeProxy = await hre.upgrades.upgradeProxy(HYDNSealProxyDeployment.address, HYDNSeal1, {
    call: 'initialize',
    timeout: 0,
    pollingInterval: 10000,
  })
  await upgradeProxy.deployTransaction.wait()
  console.info(`upgradeProxy ${upgradeProxy.address}`)
  const implAddress = await hre.upgrades.erc1967.getImplementationAddress(HYDNSealProxyDeployment.address)
  console.info(`HYDNSeal new impl ${implAddress}`)

  const artifact = await hre.deployments.getExtendedArtifact('HYDNSeal')
  const proxyDeployments = {
    address: upgradeProxy.address,
    ...artifact,
  }

  console.info('Save artifacts')
  await save('HYDNSeal', proxyDeployments)
  console.info('Verifying')
  if (!['localhost', 'hardhat'].includes(hre.network.name)) {
    await hre.run('verify:verify', {
      address: implAddress,
      // constructorArguments: [],
    })
  }
}

main().catch((error) => console.error('Deploy proxy error: ', error))
