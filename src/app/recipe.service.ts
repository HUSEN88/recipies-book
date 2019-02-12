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


  constructor(private authService: AuthService, private db: AngularFireDatabase, private afAuth: AngularFireAuth) {
  }

ngOnInit() {
 }



getRecipe(userId) {
    console.log(userId);
    return this.db.list('/recipes/' + userId).valueChanges();
}

  createRecipe(title)  {
    this.afAuth.authState.subscribe(user => {
      console.log(user.uid);
      this.userId = user.uid;
      this.recipeRef = firebase.database().ref('/recipes/' + this.userId);

      this.recipeRef.push({
        title: title
      });
    });
}

}
