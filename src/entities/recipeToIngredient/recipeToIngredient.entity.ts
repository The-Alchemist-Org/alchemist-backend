import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { Ingredient } from '../ingredient/ingredient.entity';
import { IRecipeToIngredient } from './types';

@Entity('recipe_to_ingredient')
export class RecipeToIngredient implements IRecipeToIngredient {
  @PrimaryGeneratedColumn()
    id: number;

  @Column({ name: 'quantity' })
    quantity: number;

  @JoinColumn({ name: 'recipe_id' })
  @ManyToOne(() => Recipe, (recipe) => recipe)
    recipe: Recipe;

  @JoinColumn({ name: 'ingredient_id' })
  @ManyToOne(() => Ingredient, (ingredient) => ingredient)
    ingredient: Ingredient;
}
