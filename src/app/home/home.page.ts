import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private  router:  Router) {}

  ngOnInit() {
  }

  firstGame(){
    this.router.navigate(['/home/first-game']);
  }

  secondGame(){
    this.router.navigate(['/home/second-game']);
  }

  thirdGame(){
    this.router.navigate(['/home/third-game']);
  }
}
