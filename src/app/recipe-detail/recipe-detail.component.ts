import { Component } from '@angular/core';
import { Recipe } from '../recipe';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent {
  recipe: Recipe;
  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
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
  }

  async ngOnInit() {
    let id: number = 0;
    // Fetching the id of the recipe to be displayed from the URL
    this.route.params.subscribe(params => {
      id = +params['id'];
    });
    await this.recipeService.addDefaultRecipes();
    // Fetching the recipe by ID from UI
    this.recipeService.getRecipeById(id).then(recipe => {
      if(recipe != undefined) {
        this.recipe = recipe;
      }
      else 
        console.log("Error in fetching the recipe");
    });
  }
}
