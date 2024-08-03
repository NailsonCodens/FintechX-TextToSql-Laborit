import { randomUUID } from 'node:crypto'
import { Environment } from 'vitest'
import 'dotenv/config'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>(<unknown>{
  transformMode: 'ssr',
  name: 'prisma',
  async setup() {
    const schema = randomUUID()

    process.env.DB_DATABASE =  process.env.DB_DATABASE_TEST
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST
    
    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        /*await prisma.$executeRawUnsafe(
          `DROP DATABASE IF EXISTS "${process.env.DB_DATABASE_TEST}" CASCADE`,
        )*/

        await prisma.$disconnect()
      },
    }
  },
})