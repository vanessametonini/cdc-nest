import { Controller, Post, Body, Get, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  async create(@Body() book: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(book)
  }

  @Get()
  async list() {
    return await this.bookRepository.find({ relations: ["category", "author"]})
  }
  
}
