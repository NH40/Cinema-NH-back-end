import { Prisma } from '@prisma/client'
import { returnUserObject } from 'src/user/return-user.object'

export const returnReviewObject: Prisma.ReviewSelect = {
	id: true,
	rating: true,
	text: true,
	createdAt: true,
	user: {
		select: returnUserObject
	}
}
