import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe: Recipe;
  constructor(private route: ActivatedRoute) {
    this.recipe = {
      id: 0,
      name: "NA",
      time: 0,
      cuisine: "NA",
      ingredients: [],
      steps: [],
      difficulty: 0,
      author: "NA"
    }
    this.route.params.subscribe(params => {
      console.log(params['id']);
    })
  }
  ngOnInit() {
    this.recipe = {
      id: 1,
      name: "Tart Pecan Pie",
      time: 30,
      cuisine: "Dessert",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      steps: ["Step 1", "Step 2", "Step 3"],
      difficulty: 25,
      author: "John Doe"
    }
  }
}
