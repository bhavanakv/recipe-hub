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
  logoUrl: string = 'assets/logo.png';
  facebookUrl: string = 'https://www.facebook.com/examplecompany';
  twitterUrl: string = 'https://www.twitter.com/examplecompany';
  instagramUrl: string = 'https://www.instagram.com/examplecompany';

  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipes = [];
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  viewRecipe(id: number) {
    //this.id = 1;
    this.router.navigate(["/recipe", id])
  }
}
