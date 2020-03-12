import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('author')
export class AuthorController {
  
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() authorInput: CreateAuthorDto): Promise<CreatedAuthorDto> {
    return await this.authorsRepository
      .save(authorInput)
      .then(author => new CreatedAuthorDto(author))
  }
}
