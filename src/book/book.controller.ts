import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';

@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() bookInput: CreateBookDto){

    const book =  {
      ISBN: bookInput.ISBN,
      abstract: bookInput.abstract,
      category: { id: bookInput.categoryId },
      numberOfPages: bookInput.numberOfPages,
      price: bookInput.price,
      publishingDate: bookInput.publishingDate,
      summary: bookInput.summary,
      title: bookInput.title
    }

    return await this.bookRepository.save(book).then(book => book)
  }
  
}
