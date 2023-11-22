import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';

@Component({
  selector: 'app-submit-recipe',
  templateUrl: './submit-recipe.component.html',
  styleUrls: ['./submit-recipe.component.css']
})
export class SubmitRecipeComponent {

  ingredients: string[] = [];
  newIngredient: string = '';
  i: number = 0;
  alertMessage: string = '';
  successToast: boolean = false;
  errorToast: boolean = false;
  recipe: Recipe;

  constructor(private router: Router) { 
    this.recipe = {
      id: 0,
      name: "NA",
      time: 0,
      cuisine: "NA",
      ingredients: [],
      steps: [],
      difficulty: 0,
      author: "NA",
      prepTime: 0,
      cookingTime: 0,
      pieChart: {
        labels: ["Carbs", "Fats", "Proteins", "Others"],
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

  ngOnInit() {
  }

  addRecipe(ingredient: string) {
    console.log("Adding recipes")
    if (ingredient.length > 0) {
      const badgeElement = document.createElement('span');
      badgeElement.classList.add('badge', 'badge-primary');
      badgeElement.id = 'ing' + this.i;
      badgeElement.style.backgroundColor = '#f89223';
      badgeElement.style.borderColor = '#f89223';
      badgeElement.style.color = 'white;'
      const closeButton = document.createElement('button');
      closeButton.classList.add('btn', 'btn-primary', 'btn-sm');
      closeButton.style.backgroundColor = '#f89223';
      closeButton.style.borderColor = '#f89223';
      closeButton.style.color = 'white;'
      closeButton.addEventListener('click', () => {
        badgeElement.parentNode!.removeChild(badgeElement);
      });
      closeButton.innerHTML = `<i class="bi bi-x-circle"></i>`;
      badgeElement.style.marginLeft = '5px';
      badgeElement.textContent = ingredient;
      document.getElementById('showInputField')!.appendChild(badgeElement);
      document.getElementById('ing' + this.i)!.appendChild(closeButton);
      this.ingredients.push(ingredient);
      this.i++;
    }
  }

  /*
    Function to display error alert
    @param: Message to be displayed on the alert
  */
  displayErrorToast(message: string) {
    this.alertMessage = message;
    this.errorToast = true;
    setTimeout(() => {
      this.successToast = false;
      this.errorToast = false;
    }, 2000);
  }

  updateRecipeObject(name: string, description: string, cuisine: string, prepTime: number, cookingTime: number, difficulty: number, steps: string[]) {
    this.recipe.name = name;
    this.recipe.cuisine = cuisine;
    this.recipe.prepTime = prepTime;
    this.recipe.cookingTime = cookingTime;
    this.recipe.time = prepTime + cookingTime;
    this.recipe.difficulty = difficulty;
    if (localStorage.hasOwnProperty('username')) {
      this.recipe.author = localStorage.getItem('username') + "";
    }
    this.recipe.ingredients = this.ingredients;
    this.recipe.steps = steps;
    console.log(this.recipe);
  }

  onSubmit(name: string, description: string, cuisine: string, prepTimeStr: string, cookingTimeStr: string, difficultyStr: string, steps: string) {
    const prepTime = +prepTimeStr;
    const cookingTime = +cookingTimeStr;
    const difficulty = +difficultyStr;
    let stepsArray: string[] = [];
    if (steps != '') {
      stepsArray = steps.split(',');
    }

    if (name == '') {
      this.displayErrorToast('Name is missing. Please enter name of the recipe');
    }
    else if (cuisine == '') {
      this.displayErrorToast('Cuisine is missing. Please enter the cuisine type of recipe');
    }
    else if (this.ingredients.length == 0) {
      this.displayErrorToast('Ingredients are missing. Please enter the ingredients');
    }
    else if (stepsArray.length == 0) {
      this.displayErrorToast('Steps are missing. Please enter the steps');
    }
    else {
      this.updateRecipeObject(name, description, cuisine, prepTime, cookingTime, difficulty, stepsArray);
      this.successToast = true;
      this.alertMessage = 'You have successfully added your recipe to our collection.'
      setTimeout(() => {
        this.errorToast = false;
        this.successToast = false;
        //window.location.reload();
      }, 2000);
    }
  }
}
