import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor() { }

  getRecipes(): Recipe[] {
    return [
      {
        id: 1,
        name: "Tart Pecan Pie",
        time: 30,
        cuisine: "Dessert",
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        steps: ["Step 1", "Step 2", "Step 3"],
        difficulty: 25,
        author: "John Doe"
      },
      {
        id: 1,
        name: "Tart Pecan Pie",
        time: 30,
        cuisine: "Dessert",
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        steps: ["Step 1", "Step 2", "Step 3"],
        difficulty: 25,
        author: "John Doe"
      },
      {
        id: 1,
        name: "Tart Pecan Pie",
        time: 30,
        cuisine: "Dessert",
        ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
        steps: ["Step 1", "Step 2", "Step 3"],
        difficulty: 25,
        author: "John Doe"
      }
    ]
  }
}
