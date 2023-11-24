import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  recipes: Recipe[] = [];
  recipesSort: Recipe[] = [];
  constructor(private recipeService: RecipeService, private router: Router) {
    
  }

  search(searchTerm: HTMLInputElement, sort: HTMLSelectElement) {
    const searchKey = searchTerm.value
    const sortType = +sort.value;
    console.log("Searching for: ", searchKey);
    console.log(sortType);
    searchTerm.value = '';
    sort.value = '0';
    const getRecipesPromise: Promise<Recipe[]> = this.recipeService.getLastThreeRecords();
    // Converting the promise to list of Recipe objects
    getRecipesPromise.then((recipeData) => {
      if(sortType > 0) {
        if(sortType == 1) {
          recipeData.sort((a, b) => a.name.localeCompare(b.name));
        }
        if(sortType == 2) {
          recipeData.sort((a, b) => (a.prepTime < b.prepTime ? -1 : 1));
        }
        if(sortType == 3) {
          recipeData.sort((a, b) => (a.cookingTime < b.cookingTime ? -1 : 1));
        }
        if(sortType == 4) {
          recipeData.sort((a, b) => (a.difficulty < b.difficulty ? -1 : 1));
        }
      }
      this.recipes = recipeData.map((recipeData) => {
        return {
          id: recipeData.id,
          name: recipeData.name,
          description: recipeData.description,
          time: recipeData.time,
          cuisine: recipeData.cuisine,
          imageUrl: recipeData.imageUrl,
          ingredients: recipeData.ingredients,
          steps: recipeData.steps,
          difficulty: recipeData.difficulty,
          author: recipeData.author,
          prepTime: recipeData.prepTime,
          cookingTime: recipeData.cookingTime,
          pieChart: recipeData.pieChart,
          barChart: recipeData.barChart,
          stackedChart: recipeData.stackedChart
        }
      })
    });
  }

  /*
    Function to view recipe details
    @param: id of the recipe
  */
    viewRecipe(id: number) {
      this.router.navigate(["/recipe", id])
    }
}
