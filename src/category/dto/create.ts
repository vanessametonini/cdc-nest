import { IsNotEmpty } from "class-validator";
import { IsCategoryAlreadyExist } from "../validators/is-category-unique";

export class CreateCategoryDto {
  
  @IsNotEmpty()
  @IsCategoryAlreadyExist({
    message: "Category already registered, choose a different category name"
  })
  readonly name: string;

}