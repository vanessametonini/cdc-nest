import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({name: 'authors'})
export class Author {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique: true, nullable: false})
  email: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false, length: 400})
  description: string;

  @CreateDateColumn({nullable: false})
  createdDate: Date;

  constructor (partialEntity: Partial<Author>) {
    Object.assign(this, partialEntity)
  }

}
