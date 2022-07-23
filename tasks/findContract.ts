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
    '4859444e',
    '4879646e',

    '5ec',
    '35ec',
    '45ec',

    '5afe',
    '45afe',
    '35afe',

    '09876',
    '98765',
    '87654',
    '76543',
    '65432',
    '54321',
    '4321',
    '01234',
    '1234',
  ]

  while (!find) {
    const w1 = Wallet.createRandom()
    const contractAddress = getContractAddress({
      from: w1.address,
      nonce: 1,
    })
    if (targets.find((target) => contractAddress.split('0x')[1].toLowerCase().startsWith(target))) {
      console.info(`
${new Date().toISOString()}
wallet address ${w1.address}
contract address ${contractAddress}
pk ${w1.privateKey}
`)
    }
  }
})
