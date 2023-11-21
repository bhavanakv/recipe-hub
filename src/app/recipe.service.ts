import { Injectable } from '@angular/core';
import { Recipe } from './recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private dbName = 'RecipesDB';
  private storeName = 'recipes';

  constructor() { }

  /* 
    Function to create IDBDatabase
  */
  async openDB(): Promise<IDBDatabase> {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = window.indexedDB.open(this.dbName, 2);

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
    const db = await this.openDB();
    const transaction = await db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    // List of default recipes if database is empty
    const defaultRecipes = [{
      name: 'Tart Pecan Pie',
      time: 60,
      cuisine: 'American',
      ingredients: ['Pecans', 'Butter', 'Sugar', 'Eggs', 'Vanilla extract', 'Corn syrup', 'Salt', 'Pie crust'],
      steps: ['Preheat oven', 'Prepare pie crust', 'Mix ingredients', 'Pour into pie crust', 'Bake'],
      difficulty: 3,
      author: 'John Doe',
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
      time: 30,
      cuisine: 'Italian',
      ingredients: ['Pasta', 'Basil leaves', 'Pine nuts', 'Garlic', 'Olive oil', 'Parmesan cheese', 'Salt', 'Pepper'],
      steps: ['Boil pasta', 'Prepare pesto sauce', 'Mix pasta and sauce', 'Season with cheese, salt, and pepper'],
      difficulty: 2,
      author: 'Bhavana',
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
      time: 45,
      cuisine: 'Indian',
      ingredients: ['Chicken', 'Yogurt', 'Tomato sauce', 'Cream', 'Butter', 'Spices', 'Onions', 'Garlic'],
      steps: ['Marinate chicken', 'Cook onions and spices', 'Add chicken and sauces', 'Simmer', 'Garnish'],
      difficulty: 3,
      author: 'Bhanutheja',
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
    // Add the default recipes only if the length of the database is 0
    recordCount.onsuccess = (event) => {
      const records = recordCount.result;
      if (!records || records.length === 0) {
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
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    // Adding a recipe into the database
    store.add(recipe);
  }

  /* 
    Function to delete a recipe from the database
    @param: recipe to be deleted
  */
  async deleteRecipe(recipe: any): Promise<void> {
    const db = await this.openDB();
    const transaction = db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    // Deleting the recipe from the database
    store.delete(recipe);
  }

  /* 
    Function to fetch all the recipes from the database
  */
  async getAllRecipes(): Promise<any[]> {
    const db = await this.openDB();
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
    const db = await this.openDB();
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
}
