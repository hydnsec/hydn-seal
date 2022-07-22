interface ISeal {
  id: string
  chainId: number
  projectName: string
  date: string
  reportUrl: string
  ipfsHashImage?: string
  contracts: string[]
}
