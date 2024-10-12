import { PrismaClient } from '@prisma/client'

import { ACTOR } from './actor.data'

const prisma = new PrismaClient()

async function main() {
	console.log('Starting data upload...')

	try {
		const result = await prisma.actor.createMany({ data: ACTOR })
		console.log(`Successfully added ${result.count} actor to the database.`)
	} catch (e) {
		console.error('Error during data upload:', e)
		process.exit(1)
	} finally {
		await prisma.$disconnect()
		console.log('Disconnected from database.')
	}
}

main()
