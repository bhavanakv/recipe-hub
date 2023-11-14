import { Component } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';

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

  constructor(private recipeService: RecipeService) {
    this.recipes = [];
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

}
