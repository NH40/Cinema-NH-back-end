import { IsString } from 'class-validator'

export class UpdateGeneraDto {
	@IsString()
	name: string

	@IsString()
	description: string

	@IsString()
	icon: string
}
