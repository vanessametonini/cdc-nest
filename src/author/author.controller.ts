import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Authors } from './author.entity';
import { CreateAuthorDto } from './dto/create';

@Controller('author')
export class AuthorController {

  constructor(
    @InjectRepository(Authors)
    private readonly authorsRepository: Repository<Authors>,
  ) { }

  @Post()
  async create(@Body() authorInput: CreateAuthorDto) {

    return await this.authorsRepository
    .save(authorInput)
    .then(
      resolve => resolve
    )
    .catch(
      reject => {
        console.error(reject);
        throw new BadRequestException(reject.message)
      }
    )
      
  }

}
