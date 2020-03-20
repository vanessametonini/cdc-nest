import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

import { BookEntity } from '../book.entity';
import { getRepository } from 'typeorm';

export function IsISBNAlreadyExist(validationOptions?: ValidationOptions) {
  return function(object: Object, propertyName: string) {
    registerDecorator({
      name: 'isISBNAlreadyExist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(isbn: any, args: ValidationArguments) {
          return getRepository(BookEntity)
            .findOne({ ISBN: isbn })
            .then(category => {
              if (category) return false;
              return true;
            });
        },
      },
    });
  };
}
