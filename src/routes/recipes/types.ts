export type RecipeBody = {
  name: string;
  uploadedBy: number;
  ingredients: {
    id: number,
    quantity: number
  }[];
};
