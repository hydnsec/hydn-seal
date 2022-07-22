import pinataSDK, { PinataPinOptions } from '@pinata/sdk'
import assert from 'assert'
import fs, { ReadStream } from 'fs'

if (!process.env.PINATA_API_KEY || !process.env.PINATA_API_SECRET) {
  throw new Error('Pinata api key or secret missing')
}
const externalUrlBase = ''
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET)

export async function uploadImage(path: string, projectName: string): Promise<string> {
  const file: ReadStream = fs.createReadStream(path)

  const options: PinataPinOptions = {
    pinataMetadata: {
      name: `seal_img_${projectName}_${Date.now()}`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  }

  return pinata
    .pinFileToIPFS(file, options as any)
    .then((result: any) => {
      assert(result && result.IpfsHash, 'Pinata uploadFile invalid response')
      return result.IpfsHash
    })
    .catch((error: any) => {
      console.error('Pinata uploadFile error', error)
      throw error
    })
}

export async function uploadMetadata(
  ipfsHashImage: string,
  projectName: string,
  auditReportUrl: string,
  contracts: string[]
): Promise<any> {
  const options: PinataPinOptions = {
    pinataMetadata: {
      name: `seal_metadata_${projectName}_${Date.now()}`,
    },
    pinataOptions: {
      cidVersion: 0,
    },
  }

  return pinata
    .pinJSONToIPFS(
      {
        image: `ipfs://${ipfsHashImage}`,
        description: `Hydn seal ${projectName}.`,
        external_url: `${externalUrlBase}${projectName}`,
        name: `Hydn seal ${projectName}`,
        background_color: '001f2b',
        audit_report_url: auditReportUrl,
        project_name: projectName,
        contracts,
      },
      options as any
    )
    .then((result: any) => {
      // logger.info('result uploadMetadata', { result })
      assert(result && result.IpfsHash, 'Pinata uploadMetadata invalid response')
      return result.IpfsHash
    })
    .catch((error: Error) => {
      console.error('Pinata uploadMetadata error', error)
      throw error
    })
}

export default { uploadImage, uploadMetadata }
