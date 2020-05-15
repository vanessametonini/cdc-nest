import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';

import { ToBookPipe } from './pipes/to-book.pipe';

@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  @UsePipes(ValidationPipe, ToBookPipe)
  async create(@Body() book: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(book).then(book => book)
  }
  
}
