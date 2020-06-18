import { Controller, Post, Body, Get, UseInterceptors, ClassSerializerInterceptor, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';

@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  async create(@Body() book: BookEntity): Promise<BookEntity> {
    return await this.bookRepository.save(book)
  }
  
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async list() {
    return await this.bookRepository.find({ relations: ["category", "author"]})
  }

  @Get(':id')
  async findOne(@Param() param): Promise<BookEntity> {

    const id = param.id;

    return await this.bookRepository.findOne({ 
      where: { id },
      relations: ["category", "author"] 
    })


  }
  
}
