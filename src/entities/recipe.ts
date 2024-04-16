/* eslint-disable @typescript-eslint/indent */
import {
    Entity, Column, PrimaryGeneratedColumn, OneToMany
   } from 'typeorm';
    import { RecipeToIngredient } from './recipe-to-ingredient';
   
   export interface IRecipe {
     id: number;
     name: string;
     uploadedBy: string;
     ingredients: RecipeToIngredient[]
   }
   
   @Entity('recipes')
   export class Recipe implements IRecipe {
     @PrimaryGeneratedColumn( { name: 'id' } )
     id: number;

     @Column( { name: 'name' } )
     name:string;

     @Column( { name: 'uploaded_by' } )
     uploadedBy: string;

     @OneToMany(() => RecipeToIngredient, recipeToIngredient => recipeToIngredient.recipe)
     ingredients: RecipeToIngredient[]
   }
   