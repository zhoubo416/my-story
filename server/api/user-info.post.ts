// server/api/getUserInfo.get.ts
import type { H3Event } from 'h3'
import { defineEventHandler } from 'h3'
import { nanoid } from 'nanoid'
import dayjs from 'dayjs'
import type { PoolClient } from 'pg'
import { pgPool } from '../utils/pgClient'

export default defineEventHandler(async (event: H3Event) => {
  const data = await readBody(event)
  console.log(data, 'data server')
  const userInfo = data.userInfo
  const logs = data.logs
  const password = data.password

  const client = await pgPool.connect()

  try {
    await client.query('BEGIN')
    // 增加一个密码校验 TODO

    // 判断是更新还是插入
    if (userInfo.id) {
      const sqlText = 'update user_info set name=$1,avatar=$2,description=$3,update_date=$4 where id=$5'
      const result = await client.query(sqlText, [userInfo.name, userInfo.avatar, userInfo.description, dayjs().valueOf(), userInfo.id])
      console.log(result, 'result 2')
      if (result.rowCount === 1) {
        // 删除现有的logs 重新插入
        deleteLogsByUserId(client, userInfo.id)
        insertLogs(client, logs, userInfo)
      } else {
        console.error(result, userInfo.id, '更新错误')
        throw new Error('更新错误')
      }
    } else {
      userInfo.id = nanoid()
      const sqlText = 'INSERT INTO user_info (id,name,password,avatar,create_date,description) VALUES ($1,$2,$3,$4,$5,$6) RETURNING id'
      const result = await client.query(sqlText, [userInfo.id, userInfo.name, password, userInfo.avatar, dayjs().valueOf(), userInfo.description])
      insertLogs(client, logs, userInfo)
      console.log(result, 'result 1')
    }

    await client.query('COMMIT')
    return {
      success: true,
      data: []
    }
  } catch (error) {
    await client.query('ROLLBACK')
    console.error('Database query error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information.'
    }
  } finally {
    client.release()
  }
})

async function insertLogs(client: PoolClient, logs: any, userInfo: any) {
  /**
   * id,user_id,title,description,create_date
   */
  logs?.forEach(async (it) => {
    if (it.title && it.description) {
      const log = [nanoid(), userInfo.id, it.title, it.description, dayjs().valueOf()]
      await client.query('INSERT INTO user_log(id,user_id,title,description,create_date) VALUES($1,$2,$3,$4,$5)', log)
    }
  })
}

async function deleteLogsByUserId(client: PoolClient, userId: string) {
  await client.query('delete from user_log where user_id=$1', [userId])
}
