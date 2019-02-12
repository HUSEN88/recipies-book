import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class RecipeService implements OnInit {
  userId: string;
  recipes;
  recipeRef = firebase.database().ref('/recipes/' + this.userId);

  constructor(private authService: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {

    this.afAuth.authState.subscribe(user => {
        console.log(user.uid);
        this.userId = user.uid;
    });
  }

ngOnInit() {
 }



getRecipe() {
  return this.db.list('/recipes/' + this.userId).valueChanges();
}

  createRecipe(title)  {
    this.recipeRef.push({
      title: title
  });  }

}
