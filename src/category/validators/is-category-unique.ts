import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments} from "class-validator";

import { getRepository } from 'typeorm';
import { Category } from "../category.entity";

@ValidatorConstraint({ async: true })
class IsCategoryAlreadyExistConstraint implements ValidatorConstraintInterface {

    validate(categoryName: any, args: ValidationArguments) {

        return getRepository(Category)
              .findOne({name: categoryName})
              .then(category => {
                if (category) return false;
                return true;
              })
        
    }

}

export function IsCategoryAlreadyExist(validationOptions?: ValidationOptions) {

   return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsCategoryAlreadyExistConstraint
        });
   };
   
}
