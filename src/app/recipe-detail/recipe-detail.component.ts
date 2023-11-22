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

  // Labels and data for the charts
  pieChartLabels: string[] = [];
  pieChartData: number[] = [];
  barChartLabels: string[] = [];
  barChartData: number[] = [];
  stackedChartLabels: string[] = [];
  stackedChartData: number[] = [];
  showSideBar: boolean = false;

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
    let id: number = 0;
    // Fetching the id of the recipe to be displayed from the URL
    this.route.params.subscribe(params => {
      id = +params['id'];
    });

    // Display sidebar only if the user is logged in so that features applicable to registered users are visible
    if(localStorage.hasOwnProperty("username")) {
      this.showSideBar = true;
    }

    // Fetching the recipe by ID from UI
    this.recipeService.getRecipeById(id).then(recipe => {
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
}
