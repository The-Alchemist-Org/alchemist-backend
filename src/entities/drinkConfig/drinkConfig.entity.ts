import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Ingredient } from '../ingredient/ingredient.entity';
import { IDrinkConfig } from './types';

@Entity('drink_config')
export class DrinkConfig implements IDrinkConfig {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @OneToOne(() => Ingredient)
  @JoinColumn()
    ingredient: Ingredient;

  @Column({ name: 'amount_left' })
    amountLeft: number;
}
