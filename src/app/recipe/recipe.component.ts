import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { AngularFireDatabase } from 'angularfire2/database';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
recipes;
title: string;
  constructor(private recipe: RecipeService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.recipe.getRecipe().subscribe( recipes => {
      this.recipes = recipes;
      console.log(this.recipes);
    });
  }

  createRecipe(title) {
    this.recipe.createRecipe(title);
  }

}
