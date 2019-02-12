import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;
  username: string;


  constructor(public authService: AuthService) {}
  ngOnInit() {}

  signup() {
    this.authService.signup(this.email, this.password, this.username);
    this.email = this.password = this.username = '';
  }
}
