interface SealContract {
  address: string
  codeHash?: string
  isProxyEIP1967?: boolean
  implementation?: string
  implementationCodeHash?: string
}

interface ISeal {
  id: string
  chainId: number
  projectName: string
  date: string
  reportUrl: string
  ipfsHashImage?: string
  contracts: SealContract[]
}
