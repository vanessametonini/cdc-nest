import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

import { getRepository } from "typeorm";
import { Author } from "../author.entity";

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {

    validate(authorEmail: any, args: ValidationArguments) {

        const AuthorRepository = getRepository(Author);

        return AuthorRepository
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
