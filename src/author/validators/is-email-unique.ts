import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

import { Author } from "../author.entity";
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {


    validate(authorEmail: any, args: ValidationArguments) {

        return getRepository(Author)
              .findOne( {email: authorEmail})
              .then( email => {
                if (email) return false;
                return true;
              })
        
    }

}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsEmailAlreadyExistConstraint
        });
   };
}
