import { Component, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})

export class SearchComponent {

  @Input() searchKeyFromHome: string = '';

  recipes: Recipe[] = [];
  sortedRecipes: Recipe[] = [];
  allRecipes: Recipe[] = [];
  showEmptyMessage: boolean = false;
  showSearchResults: boolean = false;
  suggestionsVisible: boolean = false;
  filteredSuggestions: string[] = [];

  constructor(private recipeService: RecipeService, private router: Router) {
    
  }

  async ngOnInit() {
    this.showEmptyMessage = false;
    console.log("Calling from home reached");
    this.searchFromHome();
    // Fetching all recipes from database
    await this.getAllRecipes();
    const searchInput = document.getElementById("searchTerm");
    if(searchInput) {
      searchInput.addEventListener("keyup", this.handleSearchTermChange.bind(this));
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.showEmptyMessage = false;
    // Execute the search again if different search term is entered in home page
    if (changes['searchKeyFromHome'] && !changes['searchKeyFromHome']['firstChange']) {
      this.searchFromHome();
    }
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

  /* 
    Function to handle event listener when keys are pressed.
    When keys are pressed, then corresponding recipes are returned as suggestions and they are made visible.
    @param: keyboard event
  */
  handleSearchTermChange(event: KeyboardEvent) {
    console.log("Key Pressed");
    if(event.target) {
      // Fetching the search term from input field
      const searchTerm = (event.target as HTMLInputElement).value;

    // If the length is 0, then suggestions are removed and not made visible
    if (searchTerm.length === 0) {
      this.filteredSuggestions = [];
      this.suggestionsVisible = false;
      return;
    }
    
    // If not, then recipes are filtered based on the search term entered and made visible
    this.filteredSuggestions = this.allRecipes.filter(recipe => recipe.name.toLowerCase().includes(searchTerm.toLowerCase())).map(recipe => recipe.name);
    console.log(this.filteredSuggestions);
    this.suggestionsVisible = this.filteredSuggestions.length > 0;
  }
    
  }

  /* 
    Function to set suggestion clicked as the text in input field
    @param: suggestion clicked
  */
  selectSuggestion(suggestion: string) {
    console.log("Suggested selected: ", suggestion);
    const searchInput = document.getElementById("searchTerm");
    // Setting the suggestion clicked as the text of input field
    if(searchInput) {
      (searchInput as HTMLInputElement).value = suggestion;
    }
    // Removing the suggestions and hiding them
    this.filteredSuggestions = [];
    this.suggestionsVisible = false;
  }

  /* 
    Function to search for recipes based on the search term entered
    @param: searchKey and sorting type
  */
  searchEngine(searchKey: string, sortType: number) {
    this.showSearchResults = true;
    const getRecipesPromise: Promise<Recipe[]> = this.recipeService.getAllRecipes();
    getRecipesPromise.then((recipeData) => {
      // Sorting the recipes based on the order entered from user
      if(sortType > 0) {
        // Sorting alphabetically
        if(sortType == 1) {
          recipeData.sort((a, b) => a.name.localeCompare(b.name));
        }
        // Sorting based on preparation time
        if(sortType == 2) {
          recipeData.sort((a, b) => (a.prepTime < b.prepTime ? -1 : 1));
        }
        // Sorting based on cooking time
        if(sortType == 3) {
          recipeData.sort((a, b) => (a.cookingTime < b.cookingTime ? -1 : 1));
        }
        // Sorting based on difficulty level
        if(sortType == 4) {
          recipeData.sort((a, b) => (a.difficulty < b.difficulty ? -1 : 1));
        }
      }
      // Converting the promise to list of Recipe objects
      this.sortedRecipes = recipeData.map((recipeData) => {
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
      // Filtering the recipes based on the search term
      this.recipes = this.sortedRecipes.filter(recipe => {
        // If the search term matches any value is the list of keys and values, then true is returned otherwise false
        if(Object.values(recipe).some(value => value && value.toString().toLowerCase().includes(searchKey.toLowerCase()))) {
          return true;
        }
        return false;
      });

      // If there are no recipes found, then corresponding message is displayed
      if(this.recipes.length == 0) {
        this.showEmptyMessage = true;
        this.showSearchResults = false;
      }
    });
  }

  /* 
    Function to perform search based on the keyword entered in the home page
  */
  searchFromHome() {
    this.showEmptyMessage = false;
    if(this.searchKeyFromHome.length > 0) {
      this.searchEngine(this.searchKeyFromHome, 0);
    }
  }

  /* 
    Function to perform search based on the keyword and sorting type
    @param: search and sort HTML elements
  */
  search(searchTerm: HTMLInputElement, sort: HTMLSelectElement) {
    this.suggestionsVisible = false;
    this.showEmptyMessage = false;
    // Fetching the search term and sorting type from the HTML elements
    const searchKey = searchTerm.value
    const sortType = +sort.value;
    console.log("Searching for: ", searchKey);
    // Setting the search key and sort type back to default values
    searchTerm.value = '';
    sort.value = '0';
    // If empty string is entered by user, then message is displayed
    if(searchKey.length == 0) {
      this.showEmptyMessage = true;
    }
    if(searchKey.length > 0) {
      this.searchEngine(searchKey, sortType);
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
