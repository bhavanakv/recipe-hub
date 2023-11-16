import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  recipes: Recipe[];
  headerString: string = '';
  logoUrl: string = 'assets/logo.png';
  facebookUrl: string = 'https://www.facebook.com/recipehub';
  twitterUrl: string = 'https://www.twitter.com/recipehub';
  instagramUrl: string = 'https://www.instagram.com/recipehub';

  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipes = [];
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    // Displaying the name of the user on home page after successful login.
    // Picking the username from localStorage
    if(localStorage.hasOwnProperty('username') ) {
      this.headerString = "Hello " + localStorage.getItem('username') + "!";
    }
    else {
      this.headerString = "Do you like cooking?"
    }
  }

  /*
    Function to view recipe details
    @param: id of the recipe
  */
  viewRecipe(id: number) {
    //this.id = 1;
    this.router.navigate(["/recipe", id])
  }
}
