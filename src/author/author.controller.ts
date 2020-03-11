import { Controller, Post, Body, HttpCode, UsePipes, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto, CreatedAuthorDto } from './dto/create';
import { AuthorValidationPipe } from './pipes/author-validation.pipe';

@Controller('author')
export class AuthorController {
  constructor(
    @InjectRepository(Author)
    private readonly authorsRepository: Repository<Author>,
  ) {}

  @Post()
  @UsePipes(AuthorValidationPipe)
  async create(
    @Body() authorInput: CreateAuthorDto,
  ): Promise<CreatedAuthorDto> {
    return await this.authorsRepository
      .save(authorInput)
      .then(author => new CreatedAuthorDto(author))
      .catch(erro => {
        throw new HttpException(erro, 500);
      });
  }
}
