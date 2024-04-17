import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne
   } from 'typeorm';
   import { Recipe } from './recipe';
   import { Ingredient } from './ingredient';
   
   @Entity('recipe_to_ingredient')
   export class RecipeToIngredient {
     @PrimaryGeneratedColumn()
     id: number;
   
     @Column( { name: 'recipe_id' } )
     recipeId: number;

     @Column( { name: 'ingredient_id' } )
     ingredientId: number;

     @Column( { name: 'quantity' } )
     quantity: number;

     @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
     recipe: Recipe;

     @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeToIngredients)
     ingredient: Ingredient;
   }
   
