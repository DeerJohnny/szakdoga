import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { Storage } from '@ionic/storage';
import { GameDataServices } from './getresults.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  list: any;

  constructor(private storage: Storage, private  router:  Router, private service: GameDataServices) {}

  ngOnInit() {
    this.storage.set("tired", 0);
    this.storage.set("stress", 0);
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

  logout() {
    this.storage.remove('user')
    this.router.navigate(['/login']);
  }

  async downloadAllTest() {
    this.service.get(await this.storage.get("user"));
  }  

  tired(event: any) {
    this.storage.set("tired", event.detail.value);
  }

  stress(event: any) {
    this.storage.set("stress", event.detail.value);
  }
}
