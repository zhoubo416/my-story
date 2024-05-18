// oss.config.ts
import dotenv from 'dotenv'

dotenv.config()

export const ossConfig = {
  region: process.env.OSS_REGION || '',
  accessKeyId: process.env.OSS_ACCESS_KEY_ID || '',
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET || '',
  bucket: process.env.OSS_BUCKET || ''
}
