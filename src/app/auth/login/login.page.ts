import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
    console.log("LoginPage - OnInit")
  }

  login(form){
    if (this.authService.login(form.email, form.password)) {
      this.router.navigateByUrl('home');
    }
  }

  register() {
    this.router.navigateByUrl('register');
  }

  vendeg() {
    this.router.navigateByUrl('home');
  }

}