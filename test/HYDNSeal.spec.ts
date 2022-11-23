import { expect } from 'chai'
import { Signer } from 'ethers'
import { formatBytes32String } from 'ethers/lib/utils'
import hre from 'hardhat'
import { HYDNSeal } from '../typechain-types'

describe('HYDNSeal', function () {
  let signer: Signer
  let signerOther1: Signer
  let proxy: HYDNSeal
  let implAddress: string
  let receiver: string
  let receiver1: string

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
    implAddress = await hre.upgrades.erc1967.getImplementationAddress(proxy.address)
    receiver = implAddress // use implementation as dummy contract
    receiver1 = proxy.address // use proxy as second dummy contract
  })

  it('Should be setup', async () => {
    expect(await proxy.currentAuditId()).to.be.eq((hre.network.config.chainId || 0) * idMultiplier)
    expect(await proxy['totalSupply()']()).to.be.eq(0)
    expect(await proxy['totalSupply(uint256)'](0)).to.be.eq(0)
    expect(await proxy.balanceOf(await signer.getAddress(), 0)).to.be.eq(0)
    await expect(proxy.uri(0)).to.be.revertedWith('HYDNSeal: token not existing')
    expect(await proxy['totalSupply(uint256)'](0)).to.be.eq(0)
  })

  it('Cannot initialize more than 1 time', async () => {
    await expect(proxy.initialize('http://localhost:3000/api/seals/')).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })

  it('Cannot upgrade if not owner', async () => {
    const HYDNSealFactory = await hre.ethers.getContractFactory('HYDNSeal', signerOther1)
    await expect(
      hre.upgrades.upgradeProxy(proxy.address, HYDNSealFactory, {
        kind: 'uups',
      })
    ).to.be.revertedWith('Ownable: caller is not the owner')
  })

  it('Should mint', async () => {
    const addresses = [receiver]
    await proxy.mintSeal(addresses)
    const tokenId = await proxy.currentAuditId()
    expect(tokenId).to.be.eq(1 + (hre.network.config.chainId || 0) * idMultiplier)
    expect(await proxy['totalSupply(uint256)'](tokenId)).to.be.eq(1)
    expect(await proxy.balanceOf(receiver, tokenId)).to.be.eq(1)
    expect(await proxy.uri(tokenId)).to.be.eq(`http://localhost:3000/api/seals/${tokenId}`)
  })

  it('Should throw when mint is not call by the owner', async () => {
    await expect(proxy.connect(signerOther1).mintSeal([await signerOther1.getAddress()])).to.be.revertedWith(
      'Ownable: caller is not the owner'
    )
  })

  it('Should throw to mint to a non-contract address', async () => {
    const address = await signer.getAddress()
    const addresses = [address]
    await expect(proxy.mintSeal(addresses)).to.be.revertedWith('HYDNSeal: receiver is not a contract')
  })

  it('Should throw to transfer', async () => {
    const addresses = [receiver]
    await proxy.mintSeal(addresses)
    const tokenId = await proxy.currentAuditId()
    await expect(proxy.safeTransferFrom(receiver, receiver1, tokenId, 1, formatBytes32String(''))).to.be.revertedWith(
      'HYDNSeal: transfer not allowed'
    )
    await expect(
      proxy.safeBatchTransferFrom(receiver, receiver1, [tokenId], [1], formatBytes32String(''))
    ).to.be.revertedWith('HYDNSeal: transfer batch not allowed')
  })

  it('Cannot reinitialize more than 1 time', async () => {
    await proxy.reinitialize('http://localhost1:3000/api/seals/')
    const addresses = [receiver]
    await proxy.mintSeal(addresses)
    const tokenId = await proxy.currentAuditId()
    expect(await proxy.uri(tokenId)).to.be.eq(`http://localhost1:3000/api/seals/${tokenId}`)
    await expect(proxy.reinitialize('http://localhost2:3000/api/seals/')).to.be.revertedWith(
      'Initializable: contract is already initialized'
    )
  })
})
