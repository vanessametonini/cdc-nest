import { Module } from '@nestjs/common';
import { AuthorController } from './author.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from './author.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Authors])],
  controllers: [AuthorController]
})
export class AuthorModule {}
