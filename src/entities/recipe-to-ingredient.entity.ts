import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { IRecipe, Recipe } from './recipe.entity';
import { IIngredient, Ingredient } from './ingredient.entity';

export interface IRecipeToIngredient {
  id: number;
  recipeId: number;
  ingredientId: number;
  quantity: number;
  recipe: IRecipe;
  ingredient: IIngredient;
}

@Entity('recipe_to_ingredient')
export class RecipeToIngredient implements IRecipeToIngredient {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'recipe_id' })
    recipeId: number;

  @Column({ name: 'ingredient_id' })
    ingredientId: number;

  @Column({ name: 'quantity' })
    quantity: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

  @ManyToOne(() => Ingredient, (ingredient) => ingredient.recipeToIngredients)
  @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;
}
