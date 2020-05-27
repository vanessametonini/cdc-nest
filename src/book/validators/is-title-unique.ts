import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { BookEntity } from '../book.entity';
import { getRepository } from 'typeorm';

export function IsBookTitleAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isBookTitleAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(bookTitle: any, args: ValidationArguments) {
          return getRepository(BookEntity)
            .findOne({ title: bookTitle })
            .then(category => {
              if (category) return false;
              return true;
            });
        },
      },
    });
  };
}
