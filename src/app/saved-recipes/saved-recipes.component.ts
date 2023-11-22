import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../recipe';


@Component({
  selector: 'app-saved-recipes',
  templateUrl: './saved-recipes.component.html',
  styleUrls: ['./saved-recipes.component.css']
})
export class SavedRecipesComponent {

  showEmptyMessage: boolean = false;
  recipes: Recipe[];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    this.recipes = [];
  }

  async ngOnInit() {
    this.recipeService.getAllRecipes().then(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
    });
  }

  removeRecipe() {
    console.log("Removing recipe");
  }
  
}
