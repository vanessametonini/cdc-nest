import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthorModule } from './author/author.module';

import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';
import { Author } from './author/author.entity';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    })
    ,TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      database: process.env.TYPEORM_DATABASE,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      port: parseInt(process.env.TYPEORM_PORT),
      entities: [Author],
      synchronize: true
    })
    ,AuthorModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}