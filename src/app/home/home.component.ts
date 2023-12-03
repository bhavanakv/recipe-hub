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
  allRecipes: Recipe[];
  headerString: string = '';
  showSideBar: boolean = false;
  logoUrl: string = 'assets/logo.png';
  facebookUrl: string = 'https://www.facebook.com/recipehub';
  twitterUrl: string = 'https://www.twitter.com/recipehub';
  instagramUrl: string = 'https://www.instagram.com/recipehub';
  searchResults: boolean = false;
  suggestionsVisible: boolean = false;
  filteredSuggestions: string[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipes = [];
    this.allRecipes = [];
  }

  /* 
    Function to fetch all the recipes from database
  */
    async getAllRecipes() {
      const getRecipesPromise: Promise<Recipe[]> = this.recipeService.getAllRecipes();
      getRecipesPromise.then((recipeData) => {
        // Converting the promise to list of Recipe objects
        this.allRecipes = recipeData.map((recipeData) => {
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

    // Fetching all recipes for autosuggestion in search bar
    this.getAllRecipes();

    // Displaying the name of the user on home page after successful login.
    // Picking the username from localStorage
    if (localStorage.hasOwnProperty('username')) {
      this.showSideBar = true;
      this.headerString = "Hello " + localStorage.getItem('username') + "!";
    }
    else {
      this.headerString = "Do you like cooking?"
    }

    // Checking if keys are pressed in the search input element. If pressed, then recipes are suggested
    const searchInput = document.getElementById("searchInput");
    if(searchInput) {
      // Adding event listener to handle the event when keys are pressed. If pressed, then calling the function to 
      searchInput.addEventListener("keyup", this.handleSearchTermChange.bind(this));
    }
  }

  /*
    Function to view recipe details
    @param: id of the recipe
  */
  viewRecipe(id: number) {
    this.router.navigate(["/recipe", id])
  }

  /* 
    Event listener function to handle key press. 
    When key is pressed, recipes that match the search term are returned
    @param: Keyboard event
  */
  handleSearchTermChange(event: KeyboardEvent) {
    console.log("Key Pressed");
    if(event.target) {
      //Fetching the value from the input field
      const searchTerm = (event.target as HTMLInputElement).value;

    //If the search term length is 0, then there are no suggestions and they are not visible
    if (searchTerm.length === 0) {
      this.filteredSuggestions = [];
      this.suggestionsVisible = false;
      return;
    }
    
    // Otherwise, the recipes are filtered based on the search term entered and visibility is set true
    this.filteredSuggestions = this.allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm)).map(recipe => recipe.name);
    this.suggestionsVisible = this.filteredSuggestions.length > 0;
  }
    
  }

  /* 
    Function to remove the suggestions and set visibility false
    @param: suggestion clicked
  */
  selectSuggestion(suggestion: string) {
    console.log("Suggested selected: ", suggestion);
    const searchInput = document.getElementById("searchInput");
    if(searchInput) {
      // Suggestion selected in set as text value for input field
      (searchInput as HTMLInputElement).value = suggestion;
    }
    // Once selected, the suggestions are removed and visibility is set false
    this.filteredSuggestions = [];
    this.suggestionsVisible = false;
  }

  /* 
    Function to set search term as empty string once submitted
    @param: search term input element
  */
  search(searchTerm: HTMLInputElement) {
    console.log("Searching for: ", searchTerm.value);
    setTimeout(() => {
      searchTerm.value = '';
      this.suggestionsVisible = false;
    }, 100);
    this.searchResults = true;
  }
}
