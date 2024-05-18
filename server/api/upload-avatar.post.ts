// server/api/upload-avatar.post.ts
import type { IncomingMessage, ServerResponse } from 'http'
import type { H3Event } from 'h3'
import { useBody } from 'h3'
import OSS from 'ali-oss'
import multer from 'multer'
import { ossConfig } from '../../oss.config'

const client = new OSS({
  region: ossConfig.region,
  accessKeyId: ossConfig.accessKeyId,
  accessKeySecret: ossConfig.accessKeySecret,
  bucket: ossConfig.bucket
})

const upload = multer({ storage: multer.memoryStorage() })

export default defineEventHandler(async (event: H3Event) => {
  const req = event.node.req as IncomingMessage & { file?: Express.Multer.File }
  const res = event.node.res as ServerResponse

  await new Promise<void>((resolve, reject) => {
    upload.single('file')(req, res, async (err: any) => {
      if (err) {
        reject(err)
        return
      }
      resolve()
    })
  })

  if (!req.file) {
    res.statusCode = 400
    res.end('No file uploaded')
    return
  }

  try {
    const fileName = `${Date.now()}-${req.file.originalname}`
    const result = await client.put(fileName, req.file.buffer)

    // 设置文件为公共读
    await client.putACL(fileName, 'public-read')

    return { url: result.url }
  } catch (error) {
    console.error(error)
    res.statusCode = 500
    res.end('Upload failed')
  }
})
