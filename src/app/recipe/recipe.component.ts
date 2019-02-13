import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {map} from 'rxjs/operators';
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
key: string;
// updateFormShow = false;

  constructor(private recipe: RecipeService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
    }

  ngOnInit() {}

  createRecipe(title) {
    this.recipe.createRecipe(title);
  }

  // updateRecipe(key, title) {
  //   this.updateFormShow = true;
  //   this.recipe.updateRecipe(key, title);
  // }

  getRecipes() {
    this.afAuth.authState.subscribe(user => {
      console.log(user.uid);
      this.userId = user.uid;
      this.recipe.getRecipe(this.userId)
      .snapshotChanges().pipe(map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })).subscribe( recipes => {
        this.show = true;
        this.recipes = recipes;
        console.log(this.recipes);
      });
    });
  }

  delete(key) {
    this.recipe.deleteRecipe(key);
  }
  // updateForm() {
  //   this.updateFormShow = !this.updateFormShow;
  // }



}
