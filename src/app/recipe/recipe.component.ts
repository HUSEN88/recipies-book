import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  userId;
recipes;
title: string;
show = false;
  constructor(private recipe: RecipeService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

  ngOnInit() {}

  createRecipe(title) {
    this.recipe.createRecipe(title);
  }

  getRecipes() {
    this.afAuth.authState.subscribe(user => {
      console.log(user.uid);
      this.userId = user.uid;
      this.recipe.getRecipe(this.userId).subscribe(recipeList => {
        this.show = true;
        this.recipes = recipeList;
      });
    });
  }



}
