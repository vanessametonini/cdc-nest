import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class AuthorValidationPipe implements PipeTransform<any> {

  async transform(value, { metatype }: ArgumentMetadata) {

    // se não tiver um metatype ou 
    // se é tipo é um nativo do JavaScript
    // pula a validacao
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    //transforma o objeto JS em um objeto tipado, entao podemos aplicar a validacao
    const object = plainToClass(metatype, value);

    const errors = await validate(object);

    if (errors.length > 0) {

      return errors.map(error => {
        const constraints = error.constraints;

        for (const specificErrors in constraints) {

          if (constraints.hasOwnProperty(specificErrors)) {
            const errorMessage = constraints[specificErrors];
            throw new BadRequestException(errorMessage);
          }
        }

      })

    }
    return value;

  }

  //verifica se o metatype tipo é um nativo do JavaScript, 
  //caso positivo for retorna falso
  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

}
