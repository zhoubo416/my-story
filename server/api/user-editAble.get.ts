// server/api/getUserInfo.get.ts
import { defineEventHandler } from 'h3'

import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  const pool = connectToDatabase()
  const params = await getQuery(event)
  try {
    const query = `select 1 from user_info where id = $1 and password = $2`
    const { rows } = await pool.query(query, [params.userId, params.password])
    console.log(rows, params, 'rows')
    return {
      success: true,
      data: !!rows?.length
    }
  } catch (error) {
    console.error('Database query error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information.'
    }
  }
})
