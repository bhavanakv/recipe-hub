import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../recipe';
import { RecipeService } from '../recipe.service';

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
  fileErrorMessage: string = '';
  successToast: boolean = false;
  errorToast: boolean = false;
  fileErrorToast: boolean = false;
  recipe: Recipe;
  imageFile: string;

  constructor(private router: Router, private recipeService: RecipeService) {
    this.imageFile = '';
    this.recipe = {
      id: 0,
      name: "NA",
      description: "",
      time: 0,
      cuisine: "NA",
      imageUrl: "",
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
    // Display the image file name as a badge when uploaded
    const inputFile = document.getElementById('fileName');
    const fileNameDisplay = document.getElementById('fileNameDisplay');
    if (inputFile) {
      inputFile.addEventListener('change', (event: Event) => {
        const files = (event.target as HTMLInputElement).files;
        if (files && files.length > 0) {
          // Fetching the filename
          const fileName = files[0].name;
          // File is accepted only if the extension is valid - jpg, jpeg or png
          const extension: string = fileName.split('.')[1];
          if (fileNameDisplay && (extension == "jpg" || extension == "jpeg" || extension == "png")) {
            // Displaying the filename in the badge along with a close button to remove the upload
            fileNameDisplay.textContent = fileName;
            const closeButton = document.createElement('button');
            closeButton.classList.add('btn', 'btn-primary', 'btn-sm');
            closeButton.style.backgroundColor = '#f89223';
            closeButton.style.borderColor = '#f89223';
            closeButton.style.color = 'white'
            closeButton.innerHTML = `<i class="bi bi-x-circle"></i>`;
            // Listener to remove the badge element if close button is clicked
            closeButton.addEventListener('click', () => {
              fileNameDisplay.parentNode!.removeChild(fileNameDisplay);
            });
            fileNameDisplay.appendChild(closeButton);
            this.imageFile = fileName;
          }
          // Displaying error toast if invalid format like doc is uploaded
          else {
            this.fileErrorMessage = "Invalid file format. Please try again.";
            this.fileErrorToast = true;
            setTimeout(() => {
              this.fileErrorToast = false;
            }, 2000);
          }
        } else {
          if (fileNameDisplay)
            fileNameDisplay.textContent = '';
        }
      });
    }

  }

  /* 
    Function to add recipes as badges when the user adds each of the ingredient
    @param: ingredient to be shown as badge
  */
  addRecipe(ingredient: string) {
    console.log("Adding recipes")
    // Adding badges containing ingredient details when they are added
    if (ingredient.length > 0) {
      // Creating badge element and close button within each badge element
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
      closeButton.style.color = 'white';
      // Listener to remove ingredient when close button is clicked
      closeButton.addEventListener('click', () => {
        badgeElement.parentNode!.removeChild(badgeElement);
      });
      closeButton.innerHTML = `<i class="bi bi-x-circle"></i>`;
      badgeElement.style.marginLeft = '5px';
      badgeElement.textContent = ingredient;
      document.getElementById('showInputField')!.appendChild(badgeElement);
      document.getElementById('ing' + this.i)!.appendChild(closeButton);
      // Storing list of ingredients entered
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

  /* 
    Function to generate a list of random numbers whose sum is equal to 100
    @param: index - number of random integers to be generated
  */
  generateRandomToSum(index: number) {
    let sum = 0;
    let remainingSum = 100;
    let randomNumbers: number[] = [];
    // Generating random numbers such that sum is equal to 100
    for (let i = 0; i < index - 1; i++) {
      const randomNumber = Math.random() * remainingSum;
      randomNumbers.push(randomNumber);
      remainingSum -= randomNumber;
      sum += randomNumber;
    }
    randomNumbers.push(100 - sum);
    return randomNumbers;
  }

  /* 
    Function to generate random numbers between two values
    @param: max, min - boundary values, index - number of random integers to be generated
  */
  generateRandomNumber(max: number, min: number, index: number) {
    let randomNumbers: number[] = [];
    // Generating random numbers between max and min
    for (let i = 0; i < index; i++) {
      randomNumbers.push(Math.round(Math.random() * (max - min + 1) + min));
    }
    return randomNumbers
  }

  /* 
    Function to convert the input values to recipe object
    @param: name, description, cuisine, prepTime, cookingTime, difficulty, steps
  */
  updateRecipeObject(name: string, description: string, cuisine: string, prepTime: number, cookingTime: number, difficulty: number, steps: string[]) {
    this.recipe.name = name;
    this.recipe.description = description;
    this.recipe.cuisine = cuisine;
    this.recipe.prepTime = prepTime;
    this.recipe.cookingTime = cookingTime;
    this.recipe.time = prepTime + cookingTime;
    this.recipe.imageUrl = this.imageFile;
    this.recipe.difficulty = difficulty;
    // If logged in, then username property is stored in local storage. Fetching the username as author name
    if (localStorage.hasOwnProperty('username')) {
      this.recipe.author = localStorage.getItem('username') + "";
    }
    this.recipe.ingredients = this.ingredients;
    this.recipe.steps = steps;
    // Generating random values for the charts
    this.recipe.pieChart.data = this.generateRandomToSum(4);
    this.recipe.barChart.labels = this.ingredients;
    this.recipe.barChart.data = this.generateRandomNumber(10, 1, this.ingredients.length);
    this.recipe.stackedChart.labels = this.ingredients;
    this.recipe.stackedChart.data = this.generateRandomToSum(this.ingredients.length);
  }

  /* 
    Function to add recipe to the database
    @param: name, description, cuisine, prepTime, cookingTime, difficulty, steps
  */
  async onSubmit(name: string, description: string, cuisine: string, prepTimeStr: string, cookingTimeStr: string, difficultyStr: string, steps: string) {
    const prepTime = +prepTimeStr;
    const cookingTime = +cookingTimeStr;
    const difficulty = +difficultyStr;
    let stepsArray: string[] = [];
    // Converting the steps string into array of steps
    if (steps != '') {
      stepsArray = steps.split(',');
    }

    // Identifying missing fields and displaying corresponding error toasts
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
    // All the required fields are provided
    else {
      this.updateRecipeObject(name, description, cuisine, prepTime, cookingTime, difficulty, stepsArray);
      this.successToast = true;
      this.alertMessage = 'You have successfully added your recipe to our collection.'
      console.log(this.recipe);
      // Adding the recipe to DB and reloading the page
      setTimeout(async () => {
        this.errorToast = false;
        this.successToast = false;
        await this.recipeService.addRecipe(this.recipe);
        window.location.reload();
      }, 2000);
    }
  }
}
