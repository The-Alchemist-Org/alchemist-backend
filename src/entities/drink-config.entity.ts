import {
  Entity, Column, OneToOne, JoinColumn, PrimaryGeneratedColumn,
} from 'typeorm';
import { Ingredient } from './ingredient.entity';

export interface IDrinkConfig {
  id: number;
  ingredient: Ingredient;
  amountLeft: number;
  serialNumber: number;
  hopperNum: number;
}

@Entity('drink_config')
export class DrinkConfig implements IDrinkConfig {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @OneToOne(() => Ingredient)
  @JoinColumn({ name: 'ingredient', referencedColumnName: 'id' })
    ingredient: Ingredient;

  @Column({ name: 'amount_left' })
    amountLeft: number;

  @Column({ name: 'serial_number' })
    serialNumber: number;

  @Column({ name: 'hopper_num' })
    hopperNum: number;
}
