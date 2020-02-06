import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authors } from './author.entity';
import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';

@Controller('author')
export class AuthorController {

  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
  ) { }

  @Post()
  async create(@Body() authorInput: CreateAuthorDto): Promise<CreatedAuthorDto | BadRequestException> {

    return await this.authorsRepository
    .save(authorInput)
    .then((resolve) => new CreatedAuthorDto(resolve))
    .catch(
      reject => {
        throw new BadRequestException(reject.message)
      }
    )
      
  }

}
