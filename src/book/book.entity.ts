import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Category } from "../category/category.entity";
import { Author } from "src/author/author.entity";

@Entity({ name: 'books' })
export class BookEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false, length: 500 })
  abstract: string;

  @Column({ type: 'longtext', nullable: true })
  summary: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  numberOfPages: number;

  @Column({ nullable: false, unique: true })
  ISBN: string;

  @Column()
  publishingDate: Date;

  @ManyToOne(type => Category, (category: Category) => category.id)
  category: Category;

  @ManyToOne(type => Author, (author: Author) => author.id)
  author: Author;

}
