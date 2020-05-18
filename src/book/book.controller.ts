import { Controller, Post, Body, UsePipes, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import { ToBookPipe } from './pipes/to-book.pipe';
import { CreateBookDto } from './dto/create';

@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  //@UsePipes(ToBookPipe)
  async create(@Body() book: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(book)
  }

  @Get()
  list() {
    return this.bookRepository.find().then(bookList => {
      console.log(bookList[1]);
      
      return bookList
    })
  }
  
}
