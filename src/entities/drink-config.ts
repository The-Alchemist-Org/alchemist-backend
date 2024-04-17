import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
   } from 'typeorm';
import { Ingredient } from './ingredient';
   
   export interface IDrinkConfig {
     id: number;
     dispenser1Ingredient: Ingredient;
     dispenser2Ingredient: Ingredient;
     dispenser3Ingredient: Ingredient;
     dispenser4Ingredient: Ingredient;
     dispenser5Ingredient: Ingredient;
     dispenser1AmountLeft: number;
     dispenser2AmountLeft: number;
     dispenser3AmountLeft: number;
     dispenser4AmountLeft: number;
     dispenser5AmountLeft: number;
   }
   
   @Entity('recipes')
   export class Recipe implements IDrinkConfig {
     @PrimaryGeneratedColumn( { name: 'id' } )
     id: number;

     @OneToOne(() => Ingredient)
     @JoinColumn()
     dispenser1Ingredient: Ingredient;

     @OneToOne(() => Ingredient)
     @JoinColumn()
     dispenser2Ingredient: Ingredient;

     @OneToOne(() => Ingredient)
     @JoinColumn()
     dispenser3Ingredient: Ingredient;

     @OneToOne(() => Ingredient)
     @JoinColumn()
     dispenser4Ingredient: Ingredient;

     @OneToOne(() => Ingredient)
     @JoinColumn()
     dispenser5Ingredient: Ingredient;

     @Column( { name: 'dispenser_1_amount_left' } )
     dispenser1AmountLeft: number;

     @Column( { name: 'dispenser_2_amount_left' } )
     dispenser2AmountLeft: number;

     @Column( { name: 'dispenser_3_amount_left' } )
     dispenser3AmountLeft: number;

     @Column( { name: 'dispenser_4_amount_left' } )
     dispenser4AmountLeft: number;

     @Column( { name: 'dispenser_5_amount_left' } )
     dispenser5AmountLeft: number;


   }
   
