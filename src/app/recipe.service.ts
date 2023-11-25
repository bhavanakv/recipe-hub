import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private storeName = 'recipes';

  constructor() { }

  /* 
    Function to create IDBDatabase
  */
  async openDB(dbname: string, version: number): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(dbname, version);

      // Executed when database is not created
      request.onerror = (event) => {
        reject('IndexedDB error: ' + (event.target as IDBOpenDBRequest).error);
      };

      // Executed when database is created and connected successfully
      request.onsuccess = async (event) => {
        resolve((event.target as IDBOpenDBRequest).result as IDBDatabase);
      }

      // Executed when the database version is upgraded
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
        }
      };
    });
  }

/* 
  Function to fetch latest recipes on the home page
*/
  async getLastThreeRecords() {
    let recentRecipes = await this.getAllRecipes();
    // Fetch last three recipes from the list of recipes
    return recentRecipes.slice(-3);
  }

  /* 
    Function to add default recipes to the database if the database is empty
  */
  async addDefaultRecipes() {
    console.log("Adding recipes");
    const db = await this.openDB('RecipesDB', 3);
    console.log("DB opened");
    const transaction = await db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    console.log("Store opened");
    // List of default recipes if database is empty
    const defaultRecipes = [{
      name: 'Tart Pecan Pie',
      description: 'An American dessert with a sweet, gooey filling made from pecans, sugar, and butter, baked in a flaky crust for a nutty, caramelized delight.',
      time: 50,
      cuisine: 'American',
      imageUrl: 'tartPecan.jpeg',
      ingredients: ['Pecans', 'Butter', 'Sugar', 'Eggs', 'Vanilla extract', 'Corn syrup', 'Salt', 'Pie crust'],
      steps: ['Preheat oven', 'Prepare pie crust', 'Mix ingredients', 'Pour into pie crust', 'Bake'],
      difficulty: 2.8,
      author: 'John Doe',
      prepTime: 20,
      cookingTime: 30,
      pieChart: {
        labels: ['Carbs', 'Fats', 'Proteins', 'Others'],
        data: [40, 35, 15, 10] 
      },
      barChart: {
        labels: ['Pecans', 'Butter', 'Sugar', 'Eggs', 'Vanilla extract', 'Corn syrup', 'Salt', 'Pie crust'],
        data: [8, 6, 4, 3, 2, 2, 1, 4] 
      },
      stackedChart: {
        labels: ['Pecans', 'Butter', 'Sugar', 'Eggs', 'Vanilla extract', 'Corn syrup', 'Salt', 'Pie crust'],
        data: [40, 20, 15, 10, 5, 5, 3, 2] 
      }
    },
    {
      name: 'Pesto Pasta',
      description: 'Pasta tossed in a vibrant green sauce made from basil, garlic, nuts, and cheese, offering a herbaceous and nutty flavor.',
      time: 50,
      cuisine: 'Italian',
      imageUrl: 'pesto-pasta.jpg',
      ingredients: ['Pasta', 'Basil leaves', 'Pine nuts', 'Garlic', 'Olive oil', 'Parmesan cheese', 'Salt', 'Pepper'],
      steps: ['Boil pasta', 'Prepare pesto sauce', 'Mix pasta and sauce', 'Season with cheese, salt, and pepper'],
      difficulty: 1.2,
      author: 'Bhavana',
      prepTime: 10,
      cookingTime: 40,
      pieChart: {
        labels: ['Carbs', 'Fats', 'Proteins', 'Others'],
        data: [60, 20, 15, 5] 
      },
      barChart: {
        labels: ['Pasta', 'Basil leaves', 'Pine nuts', 'Garlic', 'Olive oil', 'Parmesan cheese', 'Salt', 'Pepper'],
        data: [3, 2, 4, 2, 2, 5, 1, 1] 
      },
      stackedChart: {
        labels: ['Pasta', 'Basil leaves', 'Pine nuts', 'Garlic', 'Olive oil', 'Parmesan cheese', 'Salt', 'Pepper'],
        data: [40, 25, 20, 5, 2, 3, 2, 3] 
      }
    },
    {
      name: 'Butter Chicken',
      description: 'A creamy, mildly spiced Indian dish featuring tender chicken simmered in a rich tomato-based sauce.',
      time: 75,
      cuisine: 'Indian',
      imageUrl: 'butter-chicken.jpg',
      ingredients: ['Chicken', 'Yogurt', 'Tomato sauce', 'Cream', 'Butter', 'Spices', 'Onions', 'Garlic'],
      steps: ['Marinate chicken', 'Cook onions and spices', 'Add chicken and sauces', 'Simmer', 'Garnish'],
      difficulty: 1.8,
      author: 'Bhanutheja',
      prepTime: 25,
      cookingTime: 50,
      pieChart: {
        labels: ['Proteins', 'Fats', 'Carbs', 'Others'],
        data: [40, 35, 20, 5] 
      },
      barChart: {
        labels: ['Chicken', 'Yogurt', 'Tomato sauce', 'Cream', 'Butter', 'Spices', 'Onions', 'Garlic'],
        data: [10, 5, 4, 6, 8, 3, 2, 3] 
      },
      stackedChart: {
        labels: ['Chicken', 'Yogurt', 'Tomato sauce', 'Cream', 'Butter', 'Spices', 'Onions', 'Garlic'],
        data: [40, 25, 15, 10, 10, 5, 3, 2] 
      }
    }];
    const recordCount = store.getAll();
    console.log("Fetched record count");
    // Add the default recipes only if the length of the database is 0
    recordCount.onsuccess = (event) => {
      const records = recordCount.result;
      if (!records || records.length === 0) {
        console.log("Adding default recipes")
        defaultRecipes.forEach(recipe => {
          store.add(recipe);
        }); 
      }
    };
  }

  /* 
    Function to add a recipe into the database
    @param: recipe to be added
  */
  async addRecipe(recipe: any): Promise<void> {
    console.log("Trying to add");
    const db = await this.openDB('RecipesDB', 3);
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    delete recipe['id'];
    // Adding a recipe into the database
    store.add(recipe);
  }

  /* 
    Function to delete a recipe from the database
    @param: recipe to be deleted
  */
  async deleteRecipe(recipe: any): Promise<void> {
    const db = await this.openDB('RecipesDB', 3);
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    // Deleting the recipe from the database
    store.delete(recipe);
  }

  /* 
    Function to fetch all the recipes from the database
  */
  async getAllRecipes(): Promise<any[]> {
    const db = await this.openDB('RecipesDB', 3);
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    // Retrieving all the recipes from the database
    const request = store.getAll();
    return new Promise<any[]>((resolve) => {
      request.onsuccess = () => {
        resolve(request.result);
      };
    });
  }

  /* 
    Function to retrieve a recipe by ID clicked by user
    @param: ID of the recipe to be fetched
  */
  async getRecipeById(id: number): Promise<Recipe | undefined> {
    const db = await this.openDB('RecipesDB', 3);
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    // Fetching recipe based on ID passed from UI
    const request = store.get(id);
    // Return the recipe if found otherwise undefined value is returned
    return new Promise<Recipe | undefined>((resolve) => {
      request.onsuccess = () => {
        const recipe: Recipe = request.result;
        resolve(recipe);
      };
      request.onerror = () => {
        resolve(undefined); 
      };
    });
  }

  /* 
    Function to save a recipe into user's collection
    @param: recipe to be saved
  */
  async saveRecipe(recipe: any, username: string): Promise<boolean>{
    // Try saving the recipe, if successful then true is retured otherwise false
    try {
      const db = await this.openDB('savedRecipesDB', 2);
      const transaction = db.transaction([this.storeName], 'readwrite');
      const store = transaction.objectStore(this.storeName);
      // Creating object to store in savedRecipesDB database
      const toSaveRecipe = {
        'username': username,
        'author': recipe.author,
        'name': recipe.name,
        'time': recipe.time,
        'imageUrl': recipe.imageUrl
      }
      store.add(toSaveRecipe);
      return true;
    }
    catch(error) {
      return false;
    }
  }

  /* 
    Function to get the saved recipes from the database
    @param: username of the user whose recipes needs to be fetched
  */
  async getSavedRecipes(username: string): Promise<any[]> {
    const db = await this.openDB('savedRecipesDB', 2);
    const transaction = db.transaction([this.storeName], 'readonly');
    const store = transaction.objectStore(this.storeName);
    // Retrieving all the recipes from the database
    const request = store.getAll();
    return new Promise<any[]>((resolve) => {
      request.onsuccess = () => {
        let records = request.result;
        let savedRecipes: any[] = [];
        // Looking for recipes whose author name matches username
        records.forEach((recipe) => {
          if(recipe.username == username)
            savedRecipes.push(recipe);
        });
        resolve(savedRecipes);
      };
    });
  }

  /* 
    Function to delete a saved recipe from collection 
    @param: id of the recipe to be removed
  */
  async deleteSavedRecipe(id: number): Promise<void> {
    const db = await this.openDB('savedRecipesDB', 2);
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    // Deleting the recipe from the database
    store.delete(id);
  }
}
