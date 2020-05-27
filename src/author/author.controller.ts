import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';

@Controller('author')
export class AuthorController {
  
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>
  ) {}

  @Post()
  async create(@Body() authorInput: CreateAuthorDto): Promise<CreatedAuthorDto> {
    return await this.authorsRepository
      .save(authorInput)
      .then(author => new CreatedAuthorDto(author))
  }
}
