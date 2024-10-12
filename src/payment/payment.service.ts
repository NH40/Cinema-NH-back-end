import {
	ConflictException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { UserService } from 'src/user/user.service'

import { PaymentStatus } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'
import * as YooKassa from 'yookassa'
import { PaymentStatusDto } from './dto/payment-status.dto'
import { PaymentDto } from './dto/payment.dto'
import { returnPaymentObject } from './return-payment.object'

const yooKassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['PAYMENT_TOKEN']
})

@Injectable()
export class PaymentService {
	constructor(
		private prisma: PrismaService,
		private userService: UserService
	) {}

	async checkout(dto: PaymentDto, userId: string) {
		const user = await this.userService.getById(userId)

		if (user.isHasPremium)
			throw new ConflictException(
				'У пользователя уже есть активная премиум-подписка.'
			)

		const order = await this.prisma.payment.create({
			data: {
				status: dto.status,
				amount: dto.amount,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		const payment = await yooKassa.createPayment({
			amount: {
				value: dto.amount.toFixed(2),
				currency: 'RUB'
			},
			payment_method_data: {
				type: 'bank_card'
			},
			confirmation: {
				type: 'redirect',
				return_url: `${process.env['APP_URL']}/thanks`
			},
			description: `Подписки на Cinema NH. Id заказа: #${order.id}, Id пользователя: #${user.id}`
		})

		return payment
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			const payment = await yooKassa.capturePayment(dto.object.id)
			return payment
		}

		if (dto.event === 'payment.succeeded') {
			if (!dto.object.description) {
				console.error('Description is undefined:', dto.object)
				return false
			}

			const descriptionParts = dto.object.description.split(', ')
			const orderId = descriptionParts[0].split('#')[1]
			const userId = descriptionParts[1].split('#')[1]

			await this.prisma.payment.update({
				where: {
					id: orderId
				},
				data: {
					status: PaymentStatus.PAYED
				}
			})

			await this.prisma.user.update({
				where: {
					id: userId
				},
				data: {
					isHasPremium: true
				}
			})

			return true
		}

		return true
	}

	/* Запросы для админа */

	async getAll() {
		return this.prisma.payment.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnPaymentObject
		})
	}

	async delete(id: string) {
		const payment = await this.prisma.payment.delete({
			where: {
				id
			}
		})
		if (!payment) throw new NotFoundException('Платеж не найден')

		return payment
	}
}
