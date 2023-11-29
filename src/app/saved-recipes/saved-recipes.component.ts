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
    let username = '';
    // Fetching username from localStorage
    if(localStorage.hasOwnProperty('username')) {
      username = localStorage.getItem('username') + ""; 
    }
    // Fetching the saved recipes of user with username
    this.recipeService.getSavedRecipes(username).then(recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
      // If there are no saved recipes, then display empty data message
      if(this.recipes.length == 0) {
        this.showEmptyMessage = true;
      }
    });
  }

  /* 
    Function to remove a recipe
    @param: id of the recipe to be removed
  */
  removeRecipe(id: number) {
    console.log("Removing recipe", id);
    // Fetching the id of the card to be deleted
    const cardElement = document.getElementById("card-"+id);
    if(cardElement) {
      // Removing the card from UI
      cardElement.parentElement!.removeChild(cardElement);
    }
    // Deleting from database
    this.recipeService.deleteSavedRecipe(id);
    let username = '';
    if(localStorage.hasOwnProperty('username')) {
      username = localStorage.getItem('username') + ""; 
    }
    // Displaying empty data message if all recipes are removed
    this.recipeService.getSavedRecipes(username).then(recipes => {
      if(recipes.length == 0) {
        this.showEmptyMessage = true;
      }
    });
  }
}
