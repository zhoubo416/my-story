// server/utils/db.ts

import { createPool } from '@vercel/postgres'

let pool = createPool({
  connectionString: process.env.POSTGRES_URL
})

export const connectToDatabase = () => {
  if (!pool) {
    pool = createPool({
      connectionString: process.env.POSTGRES_URL
    })
  }
  return pool
}
