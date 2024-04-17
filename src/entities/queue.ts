import {
    Entity, Column, PrimaryGeneratedColumn, CreateDateColumn
   } from 'typeorm';
   
   export interface IQueue {
     id: number;
     serialNumber: number;
     recipeId: number;
     doneAt: boolean;
   }
   
   @Entity('recipes')
   export class Queue implements IQueue {
     @PrimaryGeneratedColumn( { name: 'id' } )
     id: number;

     @Column( { name: 'serial_number' } )
     serialNumber: number;

     @Column( { name: 'recipe_id' } )
     recipeId: number;

     @CreateDateColumn( { name: 'done_at', default: null } )
     doneAt: boolean;
   }
   