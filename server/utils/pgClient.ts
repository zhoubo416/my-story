import pg from 'pg'

const { Pool } = pg

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  connectionString: process.env.POSTGRES_URL,
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DATABASE
})
export const pgPool = pool
