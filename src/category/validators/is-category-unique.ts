import {registerDecorator, ValidationOptions, ValidationArguments} from "class-validator";

import { getRepository } from 'typeorm';
import { Category } from "../category.entity";

export function IsCategoryAlreadyExist(validationOptions?: ValidationOptions) {

  return function (object: Object, propertyName: string) {

    registerDecorator({
      name: "isCategoryAlreadyExist",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(categoryName: any, args: ValidationArguments) {

          return getRepository(Category)
                  .findOne({name: categoryName})
                  .then(category => {
                    if (category) return false;
                    return true;
                  })

        }
      }
    });
  }
}
