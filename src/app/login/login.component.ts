import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {}

  login() {
    this.authService.login(this.email, this.password);
    this.router.navigateByUrl('recipe');
  }


}
