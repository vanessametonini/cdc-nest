import { Controller, Post, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateBookDto } from './dto/create';
import { InjectRepository } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/category/category.entity';
import { Author } from 'src/author/author.entity';

@Controller('book')
export class BookController {

  constructor(
    @InjectRepository(BookEntity) private readonly bookRepository: Repository<BookEntity>
  ){}

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() bookInput: CreateBookDto): Promise<BookEntity> {

    const newBook = new BookEntity(),
          category = new Category(),
          author = new Author();

    category.id = bookInput.categoryId;
    author.id = bookInput.authorId;

    newBook.ISBN = bookInput.ISBN;
    newBook.abstract = bookInput.abstract;
    newBook.category = category;
    newBook.author = author;
    newBook.numberOfPages = bookInput.numberOfPages;
    newBook.price = bookInput.price;
    newBook.publishingDate = bookInput.publishingDate;
    newBook.summary = bookInput.summary;
    newBook.title = bookInput.title;

    return await this.bookRepository.save(newBook).then(book => book)

  }
  
}
