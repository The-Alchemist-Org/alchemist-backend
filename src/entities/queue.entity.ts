import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToOne,
} from 'typeorm';
import { Recipe } from './recipe.entity';

export interface IQueue {
  id: number;
  serialNumber: number;
  recipe: Recipe;
  doneAt: Date;
}

@Entity('queues')
export class Queue implements IQueue {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  // Subject to Change since serial_number is not yet defined
  @Column({ name: 'serial_number' })
    serialNumber: number;

  @ManyToOne(() => Recipe)
  @JoinColumn({ name: 'recipe_id' })
    recipe: Recipe;

  @CreateDateColumn({ name: 'done_at', default: null })
    doneAt: Date;
}
