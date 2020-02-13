import { IsEmail, MaxLength, MinLength, IsNotEmpty } from "class-validator";

export class CreateAuthorDto {

  @MinLength(2)
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  @MaxLength(400)
  readonly description: string;

}

export class CreatedAuthorDto {
  
  readonly name: string;
  readonly email: string;
  readonly description: string;
  readonly id: string;
  readonly createdDate: string;

  constructor({name, email, description, id, createdDate}){
    this.name = name;
    this.email = email;
    this.description =  description;
    this.id = id;
    this.createdDate = createdDate; 
  }

}
