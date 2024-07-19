import type { Recipe } from "~/types/recipe";

export const builtInRecipes: Recipe[] = [
  {
    id: 1,
    name: "Brownie",
    iconColor: "red",
    ingredients: [
      { ingredientId: 1, quantity: 200, usedUnit: "g" },
      { ingredientId: 2, quantity: 150, usedUnit: "g" },
      { ingredientId: 3, quantity: 3, usedUnit: "piece" },
      { ingredientId: 4, quantity: 100, usedUnit: "g" },
      { ingredientId: 6, quantity: 150, usedUnit: "g" },
    ],
  },
  {
    id: 2,
    name: "Swiss Roll",
    iconColor: "blue",
    ingredients: [
      { ingredientId: 3, quantity: 4, usedUnit: "piece" },
      { ingredientId: 1, quantity: 100, usedUnit: "g" },
      { ingredientId: 2, quantity: 50, usedUnit: "g" },
      { ingredientId: 5, quantity: 100, usedUnit: "g" },
    ],
  },
  {
    id: 3,
    name: "Creme Brulee",
    iconColor: "yellow",
    ingredients: [
      { ingredientId: 3, quantity: 5, usedUnit: "piece" },
      { ingredientId: 12, quantity: 1, usedUnit: "piece" },
      { ingredientId: 6, quantity: 100, usedUnit: "g" },
    ],
  },
];
