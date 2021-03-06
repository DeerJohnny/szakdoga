import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private storage: Storage, private  authService:  AuthService, private  router:  Router) { }

  ngOnInit() {
  }

  login(form: { email: string; password: string; }){
    this.authService.login(form.email, form.password);
  }

  register() {
    this.router.navigateByUrl('register');
  }

  vendeg() {
    this.storage.set("user", "vendég");
    this.router.navigateByUrl('home');
  }

}