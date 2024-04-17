import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn
   } from 'typeorm';
import { ImportsNotUsedAsValues } from 'typescript';

   export interface IRating {
     id: number;
     recipe: Recipe;
     user: User;
     rating: number;
   }
   import { User } from './user';
   import { Recipe } from './recipe';
   
   @Entity('ingredients')
   export class Rating implements IRating {
     @PrimaryGeneratedColumn( { name: 'id' } )
     id: number;
     
     @OneToOne(() => User)
     @JoinColumn()
     recipe: Recipe;

     @OneToOne(() => Recipe)
     @JoinColumn()
     user: User;

     @Column( { name: 'rating' } )
     rating: number;
   }
   