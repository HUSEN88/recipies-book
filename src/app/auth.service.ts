import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private db: AngularFireDatabase) {
    this.user = firebaseAuth.authState;
    console.log(this.user);
  }

  signup(email: string, password: string, username: string) {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // User created now create the database user
        return this.db.object(`/users/${user.user.uid}`).update({
            name: username,
            email: email,
        });
    }).then(() => {
        // Success
        this.router.navigateByUrl('/recipe');
    }).catch((error) => {
        // Error
        console.log(error);
    });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        console.log(this.user);
        console.log(value.user.uid);

      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    console.log(this.user);
  }
}
