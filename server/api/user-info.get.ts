// server/api/getUserInfo.get.ts
import { defineEventHandler } from 'h3'

import { connectToDatabase } from '../utils/db'

export default defineEventHandler(async (event) => {
  const pool = connectToDatabase()
  const params = await getQuery(event)

  try {
    const query = `
      WITH recent_user_logs AS (
        SELECT
          ul.user_id,
          ul.title,
          ul.description,
          ul.create_date,
          ul.update_date,
          ROW_NUMBER() OVER (PARTITION BY ul.user_id ORDER BY GREATEST(ul.create_date, ul.update_date) DESC) AS rn
        FROM
          public.user_log ul
      )
      SELECT
          ui.id AS user_id,
          ui.name,
          ui.avatar,
          ui.create_date AS user_create_date,
          ui.update_date AS user_update_date,
          ui.description AS user_description,
          rul.title AS log_title,
          rul.description AS log_description,
          rul.create_date AS log_create_date,
          rul.update_date AS log_update_date
      FROM
          public.user_info ui
      LEFT JOIN
          (
              SELECT *
              FROM recent_user_logs
              WHERE rn <= 20
          ) rul ON ui.id = rul.user_id
      ORDER BY ui.id, rul.create_date DESC
      OFFSET $1 LIMIT $2;`

    const { rows } = await pool.query(query, [params.offset ?? 0, params.offset ?? 20])
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
