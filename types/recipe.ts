export type IconColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "violet";

export interface RecipeIngredient {
  ingredientId: number;
  quantity: number;
  usedUnit: string;
}

export interface Recipe {
  id: number;
  name: string;
  iconColor: IconColor;
  ingredients: RecipeIngredient[];
}
