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
      const request = window.indexedDB.open(this.dbName, 1);

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
      name: "Tart Pecan Pie",
      time: 30,
      cuisine: "Dessert",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      steps: ["Step 1", "Step 2", "Step 3"],
      difficulty: 25,
      author: "John Doe"
    },
    {
      name: "Pesto Pasta",
      time: 50,
      cuisine: "Italian",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      steps: ["Step 1", "Step 2", "Step 3"],
      difficulty: 20,
      author: "Bhavana"
    },
    {
      name: "Butter Chicken",
      time: 90,
      cuisine: "Indian",
      ingredients: ["Ingredient 1", "Ingredient 2", "Ingredient 3"],
      steps: ["Step 1", "Step 2", "Step 3"],
      difficulty: 35,
      author: "Bhanutheja"
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
