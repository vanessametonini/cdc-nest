import { Injectable, PipeTransform } from "@nestjs/common";
import { Category } from 'src/category/category.entity';
import { Author } from 'src/author/author.entity';
import { BookEntity } from "src/book/book.entity";
import { CreateBookDto } from "../dto/create";

@Injectable()
export class ToBookPipe implements PipeTransform {

  transform(bookInput: CreateBookDto): BookEntity {

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
    
    return newBook;
  }

}
