import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipes: Recipe[];
  headerString: string = '';
  showSideBar: boolean = false;
  logoUrl: string = 'assets/logo.png';
  facebookUrl: string = 'https://www.facebook.com/recipehub';
  twitterUrl: string = 'https://www.twitter.com/recipehub';
  instagramUrl: string = 'https://www.instagram.com/recipehub';

  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipes = [];
  }

  async ngOnInit() {
    await this.recipeService.addDefaultRecipes();
    // Retrieving the latest recipes from the database
    const getRecipesPromise: Promise<Recipe[]> = this.recipeService.getLastThreeRecords();
    // Converting the promise to list of Recipe objects
    getRecipesPromise.then((recipeData) => {
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

    // Displaying the name of the user on home page after successful login.
    // Picking the username from localStorage
    if (localStorage.hasOwnProperty('username')) {
      this.showSideBar = true;
      this.headerString = "Hello " + localStorage.getItem('username') + "!";
    }
    else {
      this.headerString = "Do you like cooking?"
    }
  }

  /*
    Function to view recipe details
    @param: id of the recipe
  */
  viewRecipe(id: number) {
    this.router.navigate(["/recipe", id])
  }
}
