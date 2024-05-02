import {
  Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Ingredient } from './ingredient.entity';

@Entity('recipe_to_ingredient')
export class RecipeToIngredient {
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
