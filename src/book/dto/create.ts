import { Book } from "../book.interface";
import { IsNotEmpty, MaxLength, Min } from "class-validator";
import { IsISBNAlreadyExist } from "../validators/is-isbn-unique";
import { IsBookTitleAlreadyExist } from "../validators/is-title-unique";
import { IsFutureDate } from "../validators/is-future-date";

export class CreateBookDto implements Book {

  @IsNotEmpty()
  @IsBookTitleAlreadyExist({message: 'A book with the same title is already registered'})
  readonly title: string;

  @IsNotEmpty()
  @MaxLength(500)
  readonly abstract: string;

  readonly summary: string;

  @IsNotEmpty()
  @Min(20)
  readonly price: number;

  @IsNotEmpty()
  @Min(100)
  readonly numberOfPages: number;

  @IsNotEmpty()
  @IsISBNAlreadyExist({message: 'ISBN already registered'})
  readonly ISBN: string;

  @IsFutureDate({ message: 'The publishing date must be in the future from today' })
  readonly publishingDate: Date;

  @IsNotEmpty()
  readonly category: string;
}
