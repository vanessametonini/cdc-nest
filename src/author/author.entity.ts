import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";
import { IsEmail, MaxLength, MinLength, IsNotEmpty } from "class-validator";

@Entity()
export class Authors {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Column({nullable: false})
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @Column({nullable: false, length: 400})
  @IsNotEmpty()
  description: string;

  @CreateDateColumn()
  createdDate: Date;

}