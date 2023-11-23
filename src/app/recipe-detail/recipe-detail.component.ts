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
  id: number = 0;
  successToast: boolean = false;
  errorToast: boolean = false;

  // Labels and data for the charts
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  barChartLabels: string[] = [];
  barChartData: number[] = [];
  stackedChartLabels: string[] = [];
  stackedChartData: number[] = [];
  loggedIn: boolean = false;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
    this.recipe = {
      id: 0,
      name: "NA",
      description: "",
      time: 0,
      cuisine: "NA",
      ingredients: [],
      imageUrl: "",
      steps: [],
      difficulty: 0,
      author: "NA",
      prepTime: 0,
      cookingTime: 0,
      pieChart: {
        labels: [],
        data: []
      },
      barChart: {
        labels: [],
        data: []
      },
      stackedChart: {
        labels: [],
        data: []
      }
    }
  }

  async ngOnInit() {
    // Fetching the id of the recipe to be displayed from the URL
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    // Display sidebar only if the user is logged in so that features applicable to registered users are visible
    if(localStorage.hasOwnProperty("username")) {
      this.loggedIn = true;
    }

    // Fetching the recipe by ID from UI
    this.recipeService.getRecipeById(this.id).then(recipe => {
      if(recipe != undefined) {
        this.recipe = recipe;
        // Populating the labels and data from the promise object
        this.pieChartLabels = this.recipe.pieChart.labels;
        this.pieChartData = this.recipe.pieChart.data;
        // Mapping ingredients object to string
        this.barChartLabels = this.recipe.ingredients.map(item => item.toString());
        this.barChartData = this.recipe.barChart.data;
        this.stackedChartLabels = this.recipe.ingredients.map(item => item.toString());
        this.stackedChartData = this.recipe.stackedChart.data;
      }
      // If there is no relevant recipe then display error
      else 
        console.log("Error in fetching the recipe");
    });
  }

  async saveRecipe() {
    let username = '';
    if(localStorage.hasOwnProperty("username")) {
      username = localStorage.getItem('username') + '';
    }
    let response = await this.recipeService.saveRecipe(this.recipe, username);
    if(response) {
      this.successToast = true;
      setTimeout(() => {
        this.errorToast = false;
        this.successToast = false;
      },2000);
    }
    else {
      this.errorToast = true;
      setTimeout(() => {
        this.errorToast = false;
        this.successToast = false;
      },2000);
    }
  }
}
