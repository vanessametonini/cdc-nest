import { Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BookController]
})
export class BookModule {}
