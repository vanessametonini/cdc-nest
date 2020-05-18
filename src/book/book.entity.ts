import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../category/category.entity";
import { Author } from "src/author/author.entity";
import { Transform, Expose } from 'class-transformer';

import { IsNotEmpty, MaxLength, Min, IsUUID } from "class-validator";
import { IsISBNAlreadyExist } from "src/book/validators/is-isbn-unique";
import { IsBookTitleAlreadyExist } from "src/book/validators/is-title-unique";
import { IsFutureDate } from "src/book/validators/is-future-date";

@Entity({ name: 'books' })
export class BookEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsNotEmpty()
  @IsBookTitleAlreadyExist({ message: 'A book with the same title is already registered' })
  @Column({ nullable: false, unique: true })
  title: string;

  @MaxLength(500)
  @Column({ nullable: false, length: 500 })
  abstract: string;

  @Column({ type: 'longtext', nullable: true })
  summary: string;

  @Min(20)
  @Column({ nullable: false })
  price: number;

  @Min(100)
  @Column({ nullable: false })
  numberOfPages: number;

  @IsNotEmpty()
  @IsISBNAlreadyExist({ message: 'ISBN already registered' })
  @Column({ nullable: false, unique: true })
  ISBN: string;

  //@Expose({name: 'data'})
  @IsFutureDate({ message: 'The publishing date must be in the future from today' })
  @Column()
  publishingDate: Date;

  @IsNotEmpty()
  @Expose({ name: 'categoryId'})
  @ManyToOne(type => Category, (category: Category) => category.id, { eager: true })
  category: Category;

  @IsUUID()
  @Expose({ name: 'authorId' })
  @ManyToOne(type => Author, (author: Author) => author.id, { eager: true })
  author: Author;

}
