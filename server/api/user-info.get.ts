// server/api/getUserInfo.get.ts
import { defineEventHandler } from 'h3'
import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async () => {
  const pool = connectToDatabase()

  try {
    const { rows } = await pool.sql`SELECT * FROM user_info`
    console.log(rows, 'result')
    return {
      success: true,
      data: rows || []
    }
  } catch (error) {
    console.error('Database query error:', error)
    return {
      success: false,
      error: 'Failed to fetch user information.'
    }
  }
})
