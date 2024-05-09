export type RecipeBody = {
  name: string;
  ingredients: {
    id: number,
    quantity: number
  }[];
};
