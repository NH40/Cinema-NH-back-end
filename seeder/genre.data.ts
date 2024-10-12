import { Prisma } from '@prisma/client'

export const GENRE: Prisma.GenreCreateInput[] = [
	{
		name: 'Комедия',
		slug: 'komediya',
		description:
			'Комедии, вызывающие смех и поднимающие настроение. Готовы ли вы посмеяться от души?',
		icon: 'LuCookie'
	},
	{
		name: 'Криминал',
		slug: 'kriminal',
		description:
			'Откройте мир криминального кино! У нас — захватывающие истории преступлений, детективы и неожиданные повороты сюжета. Погружайтесь в лучшие криминальные фильмы прямо сейчас!',
		icon: 'LuBomb'
	},
	{
		name: 'Драма',
		slug: 'drama',
		description:
			'<p>Драмы, наполненные <strong>глубокими </strong>эмоциями и жизненными историями. Готовы почувствовать это</p>',
		icon: 'LuApple'
	},
	{
		name: 'Приключения',
		slug: 'priklyucheniya',
		description:
			'<p><span style="color: rgb(153,154,165);background-color: rgb(16,15,18);font-size: medium;font-family: __GeistSans_3a0388, __GeistSans_Fallback_3a0388;">Откройте <strong>мир </strong>приключений на нашем сайте! Выбирайте лучшие фильмы о <strong><em>путешествиях </em></strong>и отважных подвигах <ins>прямо </ins>сейчас!</span>&nbsp;</p>',
		icon: 'LuHistory'
	}
]
