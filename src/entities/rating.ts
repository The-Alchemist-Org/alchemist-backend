import {
  Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { User } from './user';
import { Recipe } from './recipe';

export interface IRating {
  id: number;
  recipe: Recipe;
  user: User;
  rating: number;
}

@Entity('ratings')
export class Rating implements IRating {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  @OneToOne(() => User)
  @JoinColumn()
    recipe: Recipe;

  @OneToOne(() => Recipe)
  @JoinColumn()
    user: User;

  @Column({ name: 'rating' })
    rating: number;
}
