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
  create(@Body() bookInput: CreateBookDto){
    return this.bookRepository.save(bookInput).then( book => book)
  }
  
}
