import { expect } from 'chai'
import { Signer } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'
import hre from 'hardhat'
import { HYDNSeal } from '../typechain-types'

describe('HYDNSeal', function () {
  let signer: Signer
  let signerOther1: Signer
  let proxy: HYDNSeal

  beforeEach(async () => {
    const { deployer } = await hre.getNamedAccounts()
    signer = await hre.ethers.getSigner(deployer)
    const signers = await hre.ethers.getSigners()
    signerOther1 = signers[2]
    const HYDNSealFactory = await hre.ethers.getContractFactory('HYDNSeal', signer)
    proxy = (await hre.upgrades.deployProxy(HYDNSealFactory, { kind: 'uups' })) as HYDNSeal
    await hre.upgrades.upgradeProxy(proxy.address, HYDNSealFactory, { kind: 'uups' })
  })

  it('Should be setup', async () => {
    expect(await proxy.totalAudits()).to.be.eq(0)
    expect(await proxy.balanceOf(await signer.getAddress(), 0)).to.be.eq(0)
    expect(await proxy.uri(0)).to.be.eq('')
    expect(await proxy.totalSupply(0)).to.be.eq(0)
  })

  it('Should mint', async () => {
    const address = await signer.getAddress()
    const addresses = [address]
    const tokenUri = 'tokenUri1'
    await proxy.mintSeal(addresses, tokenUri)
    expect(await proxy.totalSupply(1)).to.be.eq(1)
    const tokenId = await proxy.totalAudits()
    expect(tokenId).to.be.eq(1)
    expect(await proxy.balanceOf(address, tokenId)).to.be.eq(1)
    expect(await proxy.uri(tokenId)).to.be.eq(`ipfs://${tokenUri}`)
  })

  it('Should throw when mint is not call by the owner', async () => {
    await expect(
      proxy.connect(signerOther1).mintSeal([await signerOther1.getAddress()], 'tokenUri1')
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })

  it('Should throw to transfer', async () => {
    const address = await signer.getAddress()
    const receiver = await signerOther1.getAddress()
    const addresses = [address]
    const tokenUri = 'tokenUri1'
    await proxy.mintSeal(addresses, tokenUri)
    const tokenId = await proxy.totalAudits()
    await expect(proxy.safeTransferFrom(address, receiver, tokenId, 1, formatBytes32String(''))).to.be.revertedWith(
      'HYDNSeal: transfer not allowed'
    )
    await expect(
      proxy.safeBatchTransferFrom(address, receiver, [tokenId], [1], formatBytes32String(''))
    ).to.be.revertedWith('HYDNSeal: transfer batch not allowed')
  })
})
