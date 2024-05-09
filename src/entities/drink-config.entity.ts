import {
  Entity, Column, PrimaryColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';

export interface IDrinkConfig {
  id: number;
  ingredient: Ingredient;
  amountLeft: number;
}

@Entity('drink_config')
export class DrinkConfig implements IDrinkConfig {
  @PrimaryColumn({ name: 'id' })
    id: number;

  @OneToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient' })
    ingredient: Ingredient;

  @Column({ name: 'amount_left' })
    amountLeft: number;
}
