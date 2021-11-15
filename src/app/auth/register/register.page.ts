import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  register(form){
    console.log(form);
    this.authService.register(form.email, form.password, form.name);
    this.router.navigateByUrl('login');
    
  }

}
