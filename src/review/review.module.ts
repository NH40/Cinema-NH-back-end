import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { ReviewController } from './review.controller'
import { ReviewService } from './review.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService]
})
export class ReviewModule {}
