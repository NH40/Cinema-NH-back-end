import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserService } from 'src/user/user.service'
import { PaymentController } from './payment.controller'
import { PaymentService } from './payment.service'

@Module({
	controllers: [PaymentController],
	providers: [PaymentService, UserService, PrismaService]
})
export class PaymentModule {}
