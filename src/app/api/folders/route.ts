import { PrismaClient, folders } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const folders = await prisma.folders.findMany()
    return new Response(JSON.stringify(folders), {
      status: 200,
    })
  } catch (error) {
    return new Response('Failed to fetch folders', { status: 500 })
  }
}