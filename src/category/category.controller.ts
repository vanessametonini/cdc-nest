import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@Controller('category')
export class CategoryController {

  constructor(
    @InjectRepository(Category) 
    private readonly categoryRepository: Repository<Category>
  ){}
  
  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() categoryInput: CreateCategoryDto){
    return await this.categoryRepository.save(categoryInput).then( category => category)
  }
  
}
