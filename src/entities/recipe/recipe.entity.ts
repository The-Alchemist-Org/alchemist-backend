import {
  Entity, Column, PrimaryGeneratedColumn, OneToMany,
} from 'typeorm';
import { RecipeToIngredient } from '../recipeToIngredient/recipeToIngredient.entity';
import { IRecipe } from './types';

@Entity('recipes')
export class Recipe implements IRecipe {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @Column({ name: 'name' })
    name: string;

  @Column({ name: 'uploaded_by' })
    uploadedBy: string;

  @OneToMany(() => RecipeToIngredient, (recipeToIngredient) => recipeToIngredient.recipe)
    ingredients: RecipeToIngredient[];
}
