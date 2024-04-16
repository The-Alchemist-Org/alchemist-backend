/* eslint-disable @typescript-eslint/indent */
import {
    Entity, Column, PrimaryGeneratedColumn
   } from 'typeorm';
   
   export interface IIngredient {
     id: number;
     name: string;
   }
   
   @Entity('recipes')
   export class Ingredient implements IIngredient {
     @PrimaryGeneratedColumn('uuid')
     id: number;
   
     @Column()
     name: string;
   }
   