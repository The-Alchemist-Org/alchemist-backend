/* eslint-disable @typescript-eslint/indent */
import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
   } from 'typeorm';
   import { Recipe } from './recipe';
   import { Ingredient } from './ingredient';
   
   @Entity('recipe_to_ingredient')
   export class RecipeToIngredient {
     @PrimaryGeneratedColumn()
     id: number;
   
     @Column()
     recipeId: number;

     @Column()
     ingredientId: number;

     @Column()
     quantity: number;

     @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
     recipe: Recipe;

     @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeToIngredients)
     ingredient: Ingredient;
   }
   