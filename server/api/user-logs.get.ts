// server/api/getUserInfo.get.ts
import { defineEventHandler } from 'h3'

import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  const pool = connectToDatabase()
  const params = await getQuery(event)
  console.log(params, 'params')
  try {
    const query = `select id,user_id,title,description,create_date,update_date from user_log where user_id = $1`
    const { rows } = await pool.query(query, [params.userId])
    const query2 = `select avatar,create_date,description,id,name,update_date from user_info where id = $1`
    const { rows: user } = await pool.query(query2, [params.userId])
    return {
      success: true,
      data: { user: user?.[0] || {}, logs: rows || [] }
    }
  } catch (error) {
    console.error('Database query error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information.'
    }
  }
})
