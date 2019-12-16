import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import {AuthService} from './auth.service';
import * as firebase from 'firebase';

@Injectable()
export class RecipeService implements OnInit {
  userId: string;
  recipes;
  recipeRef;
  recipeKey: string;


  constructor( private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

ngOnInit() {
 }



getRecipe(userId) {
    return this.db.list('/recipes/' + userId);
}

  createRecipe(title)  {
    this.afAuth.authState.subscribe(user => {
      console.log(user.uid);
      this.userId = user.uid;
      this.recipeRef = firebase.database().ref('/recipes/' + this.userId);
      // this.recipeKey = firebase.database().ref().child('/recipes/' + this.userId).push().key;
      this.recipeRef.push({
        title: title
      });
    });
}

// updateRecipe(key, value) {
//   this.afAuth.authState.subscribe(user => {
//     this.userId = user.uid;
//     firebase.database().ref('/recipes/' + this.userId + key);
//     this.recipeRef.update(key, value);
//   });
// }

deleteRecipe(key) {
  this.afAuth.authState.subscribe(user => {
    this.userId = user.uid;
    this.recipeRef = firebase.database().ref('/recipes/' + this.userId + '/' + key);
    this.recipeRef.remove();
  });
}

}
