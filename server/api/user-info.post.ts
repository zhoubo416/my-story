// server/api/getUserInfo.get.ts
import type { IncomingMessage } from 'http'
import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'
import { nanoid } from 'nanoid'
import { useDayjs } from '#dayjs'
import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event: H3Event) => {
  const req = event.node.req as IncomingMessage & { file?: Express.Multer.File }
  console.log(req, 'req')
  const pool = connectToDatabase()

  try {
    // 使用pool.query执行SQL插入命令
    const values = [nanoid().id, 2, 3, 4, useDayjs().unix(), 6]
    const result = await pool.query('INSERT INTO user_info (id,name,password,avatar,create_date,update_date) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id', values)
    console.log(result, 'result')
    return {
      success: true,
      data: []
    }
  } catch (error) {
    console.error('Database query error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information.'
    }
  }
})
