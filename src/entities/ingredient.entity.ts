import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { RecipeToIngredient } from './recipe-to-ingredient.entity';

export interface IIngredient {
  id: number;
  name: string;
}

@Entity('ingredients')
export class Ingredient implements IIngredient {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @Column({ name: 'name' })
    name: string;

  @OneToMany(() => RecipeToIngredient, (recipeToIngredient) => recipeToIngredient.ingredient)
    recipeToIngredients: RecipeToIngredient[];
}
