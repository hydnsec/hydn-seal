import { BigNumber } from 'ethers'
import { formatEther } from 'ethers/lib/utils'

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
export const displayAmount = (amount: BigNumber, decimal = 2): string =>
  parseFloat(formatEther(amount)).toFixed(decimal)
