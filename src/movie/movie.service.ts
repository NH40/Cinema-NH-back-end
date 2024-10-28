import { Injectable, NotFoundException } from '@nestjs/common'

import { PrismaService } from 'src/prisma/prisma.service'
import { generateSlug } from 'src/utils/generate-slug'
import { UpdateMovieDto } from './dto/update-movie.dto'
import { returnMovieObject } from './return-movie.object'

@Injectable()
export class MovieService {
	constructor(private prisma: PrismaService) {}

	async getAll(searchTerm?: string) {
		if (searchTerm) return this.search(searchTerm)

		return this.prisma.movie.findMany({
			select: returnMovieObject,
			orderBy: {
				createdAt: 'desc'
			}
		})
	}

	private async search(searchTerm: string) {
		return this.prisma.movie.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchTerm,
							mode: 'insensitive'
						}
					}
				]
			}
		})
	}

	async getBySlug(slug: string) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				slug
			},
			select: returnMovieObject
		})

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async getMostPopular() {
		const movies = await this.prisma.movie.findMany({
			orderBy: {
				views: 'desc'
			},
			include: {
				Actor: true,
				genres: true
			}
		})
		if (!movies) throw new NotFoundException('Популярных фильмов не найдено')

		return movies
	}

	async getByActor(actorId: string) {
		const movies = await this.prisma.movie.findMany({
			where: {
				Actor: {
					some: {
						id: actorId
					}
				}
			}
		})
		if (!movies)
			throw new NotFoundException('Фильмов с таким актером не найдено')

		return movies
	}

	async getByGenres(genreIds: string[]) {
		const movies = await this.prisma.movie.findMany({
			where: {
				genres: {
					some: {
						id: {
							in: genreIds
						}
					}
				}
			}
		})
		if (!movies)
			throw new NotFoundException('Фильмов с такими жанрами не найдено')

		return movies
	}

	async updateCountViews(slug: string) {
		const movie = await this.prisma.movie.update({
			where: {
				slug
			},
			data: {
				views: {
					increment: 1
				}
			}
		})
		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	/* Запросы для админа */

	async getById(id: string) {
		const movie = await this.prisma.movie.findUnique({
			where: {
				id
			},
			select: returnMovieObject
		})

		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}

	async create() {
		const movie = await this.prisma.movie.create({
			data: {
				title: '',
				slug: '',
				bigPoster: '',
				poster: '',
				videoUrl: '',
				Actor: {
					connect: []
				},
				genres: {
					connect: []
				}
			}
		})

		return movie.id
	}

	async update(id: string, dto: UpdateMovieDto) {
		return this.prisma.movie.update({
			where: {
				id
			},
			data: {
				title: dto.title,
				slug: generateSlug(dto.title),
				poster: dto.poster,
				bigPoster: dto.bigPoster,
				videoUrl: dto.videoUrl,
				country: dto.country,
				year: dto.year,
				duration: dto.duration,
				genres: {
					set: dto.genres?.map(genreId => ({ id: genreId })),
					disconnect: dto.genres
						?.filter(genreId => !dto.genres.includes(genreId))
						.map(genreId => ({ id: genreId }))
				},
				Actor: {
					set: dto.actors?.map(actorId => ({ id: actorId })),
					disconnect: dto.actors
						?.filter(actorId => !dto.actors.includes(actorId))
						.map(actorId => ({ id: actorId }))
				}
			}
		})
	}

	async delete(id: string) {
		const movie = await this.prisma.movie.delete({
			where: {
				id
			}
		})
		if (!movie) throw new NotFoundException('Фильм не найден')

		return movie
	}
}
