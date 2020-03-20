import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Book } from "./book.interface";

@Entity({ name: 'books' })
export class BookEntity implements Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true })
  title: string;

  @Column({ nullable: false, length: 500 })
  abstract: string;

  @Column({ type: 'longtext' })
  summary: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  numberOfPages: number;

  @Column({ nullable: false, unique: true })
  ISBN: string;

  @Column()
  publishingDate: Date;

  @Column({ nullable: false })
  category: string;
}
