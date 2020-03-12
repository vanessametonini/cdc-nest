import { Entity, Column, PrimaryGeneratedColumn,  } from "typeorm";

@Entity({name: 'categories'})
export class Category {
  
  @PrimaryGeneratedColumn()
  id: number;
    
  @Column({nullable: false})
  name: string;

}
