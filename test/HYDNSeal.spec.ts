import { expect } from 'chai'
import { Signer } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'
import hre from 'hardhat'
import { HYDNSeal } from '../typechain-types'

describe('HYDNSeal', function () {
  let signer: Signer
  let signerOther1: Signer
  let proxy: HYDNSeal
  const idMultiplier = 10000000

  beforeEach(async () => {
    const { deployer } = await hre.getNamedAccounts()
    signer = await hre.ethers.getSigner(deployer)
    const signers = await hre.ethers.getSigners()
    signerOther1 = signers[2]
    const HYDNSealFactory = await hre.ethers.getContractFactory('HYDNSeal', signer)
    proxy = (await hre.upgrades.deployProxy(HYDNSealFactory, ['http://localhost:3000/api/seals/'], {
      kind: 'uups',
    })) as HYDNSeal
    await hre.upgrades.upgradeProxy(proxy.address, HYDNSealFactory, {
      kind: 'uups',
    })
  })

  it('Should be setup', async () => {
    expect(await proxy.totalAudits()).to.be.eq((hre.network.config.chainId || 0) * idMultiplier)
    expect(await proxy.balanceOf(await signer.getAddress(), 0)).to.be.eq(0)
    await expect(proxy.uri(0)).to.be.revertedWith('HYDNSeal: token not existing')
    expect(await proxy.totalSupply(0)).to.be.eq(0)
  })

  it('Should mint', async () => {
    const address = await signer.getAddress()
    const addresses = [address]
    await proxy.mintSeal(addresses)
    const tokenId = await proxy.totalAudits()
    expect(tokenId).to.be.eq(1 + (hre.network.config.chainId || 0) * idMultiplier)
    expect(await proxy.totalSupply(tokenId)).to.be.eq(1)
    expect(await proxy.balanceOf(address, tokenId)).to.be.eq(1)
    expect(await proxy.uri(tokenId)).to.be.eq(`http://localhost:3000/api/seals/${tokenId}`)
  })

  it('Should throw when mint is not call by the owner', async () => {
    await expect(proxy.connect(signerOther1).mintSeal([await signerOther1.getAddress()])).to.be.revertedWith(
      'Ownable: caller is not the owner'
    )
  })

  it('Should throw to transfer', async () => {
    const address = await signer.getAddress()
    const receiver = await signerOther1.getAddress()
    const addresses = [address]
    await proxy.mintSeal(addresses)
    const tokenId = await proxy.totalAudits()
    await expect(proxy.safeTransferFrom(address, receiver, tokenId, 1, formatBytes32String(''))).to.be.revertedWith(
      'HYDNSeal: transfer not allowed'
    )
    await expect(
      proxy.safeBatchTransferFrom(address, receiver, [tokenId], [1], formatBytes32String(''))
    ).to.be.revertedWith('HYDNSeal: transfer batch not allowed')
  })
})
