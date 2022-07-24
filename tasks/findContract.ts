import { Wallet } from 'ethers'
import { getContractAddress } from 'ethers/lib/utils'
import { task } from 'hardhat/config'

task('findContract', 'find contract').setAction(async () => {
  let find = false

  const onExit = () => {
    find = true
    console.info('onExit')
    process.exit()
  }

  process.on('SIGINT', onExit)
  process.on('SIGQUIT', onExit)
  process.on('SIGTERM', onExit)

  const targets = [
    'deface',
    'effaced',
    'acceded',
    'decode',
    'seabed',
    'efface',
    'dabbed',
    'codec',
    'access',
    'facade',
    'bada55',

    '4859444e',
    '4879646e',

    '5ec5afe',

    '5afe',

    '0987654321',
    '987654321',
    '87654321',
    '7654321',
    '0123456789',
    '012345678',
    '1234567',
  ]

  while (!find) {
    const w1 = Wallet.createRandom()
    const contractAddress = getContractAddress({
      from: w1.address,
      nonce: 1,
    })
    if (targets.find((target) => contractAddress.split('0x')[1].toLowerCase().startsWith(target)
      || w1.address.split('0x')[1].toLowerCase().startsWith(target)
    )) {
      console.info(`
${new Date().toISOString()}
wallet address ${w1.address}
contract address ${contractAddress}
pk ${w1.privateKey}
`)
    }
  }
})
