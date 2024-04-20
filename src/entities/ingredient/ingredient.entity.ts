import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { RecipeToIngredient } from '../recipeToIngredient/recipeToIngredient.entity';
import { IIngredient } from './types';

@Entity('ingredients')
export class Ingredient implements IIngredient {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @Column({ name: 'name' })
    name: string;

  @OneToMany(() => RecipeToIngredient, (recipeToIngredient) => recipeToIngredient.ingredient)
    recipeToIngredients: RecipeToIngredient[];
}
