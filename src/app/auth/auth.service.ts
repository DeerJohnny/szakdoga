import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private email: string;
  private name: string;
  private pass: string;

  register(regemail, regpass, regname) {
    this.email = regemail;
    this.name = regname;
    this.pass = regpass;
  }

  login(logemail, logpass) {
    console.log(this.email, this.pass);
    if (this.email === logemail && this.pass === logpass) {
      console.log(true);
      return true;
    }
    return false;
  }
}
