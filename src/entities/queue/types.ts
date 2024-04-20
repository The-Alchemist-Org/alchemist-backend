import { IRecipe } from '@entities/recipe';

export interface IQueue {
  id: number;
  serialNumber: number;
  recipe: IRecipe;
  doneAt: Date;
}
