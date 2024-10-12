import { Prisma } from '@prisma/client'

export const ACTOR: Prisma.ActorCreateInput[] = [
	{
		name: 'Леонардо Ди Каприо',
		slug: 'leonardo-di-kaprio',
		photoUrl: '/uploads/actors/leo.jpg'
	},
	{
		name: 'Брэд Питт',
		slug: 'bred-pitt',
		photoUrl: '/uploads/actors/leo.jpg'
	},
	{
		name: 'Эдвард Нортон',
		slug: 'edvard-norton',
		photoUrl: '/uploads/actors/edward-norton.jpg'
	},
	{
		name: 'Мэттью Макконахи',
		slug: 'mettyu-makkonahi',
		photoUrl: '/uploads/actors/matthew.jpg'
	},
	{
		name: 'Райан Рейнольдс',
		slug: 'rajan-rejnolds',
		photoUrl: '/uploads/actors/ryan-reynolds.jpg'
	},
	{
		name: 'Сэм Уортингтон',
		slug: 'sem-uortington',
		photoUrl: '/uploads/actors/sam-worthington.jpg'
	},
	{
		name: 'Райан Гослинг',
		slug: 'rajan-gosling',
		photoUrl: '/uploads/actors/rajan-gosling.jpg'
	}
]
