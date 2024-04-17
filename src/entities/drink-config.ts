import {
	Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Ingredient } from './ingredient';

export interface IDrinkConfig {
	id: number;
	ingredient: Ingredient;
	amountLeft: number;
}

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

