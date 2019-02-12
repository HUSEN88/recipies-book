import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: Observable<firebase.User>;
  constructor( private authService: AuthService, private router: Router) {
  }
  ngOnInit() {
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('login');
    console.log(this.user);
  }
}
