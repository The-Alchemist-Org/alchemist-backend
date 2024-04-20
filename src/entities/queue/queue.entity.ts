import {
  Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn,
} from 'typeorm';
import { Recipe } from '../recipe/recipe.entity';
import { IQueue } from './types';

@Entity('queues')
export class Queue implements IQueue {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

  // Subject to Change since serial_number is not yet defined
  @Column({ name: 'serial_number' })
    serialNumber: number;

  @OneToOne(() => Recipe)
  @JoinColumn()
    recipe: Recipe;

  @CreateDateColumn({ name: 'done_at', default: null })
    doneAt: Date;
}
