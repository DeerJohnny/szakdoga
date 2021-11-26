import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { Storage } from '@ionic/storage';
import { GameDataServices } from './getresults.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  list: any;
  toast: any;

  constructor(private storage: Storage, private  router:  Router, private service: GameDataServices, public toastController: ToastController) {}

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
    let user = await this.storage.get("user");
    if (user === "vendég") {
      this.vendegUser();
    } else this.service.get(user);
  }  

  tired(event: any) {
    this.storage.set("tired", event.detail.value);
  }

  stress(event: any) {
    this.storage.set("stress", event.detail.value);
  }

  async vendegUser() {
    this.toast = document.createElement('ion-toast');
    this.toast.message = 'Kérem jelentkezzen be az adatok letöltéséhez!';
    this.toast.position = 'middle';
    this.toast.cssClass = 'toast-online-class',
    this.toast.buttons = [
      {
        text: 'bezárás',
        role: 'cancel'
      }
    ];
  
    document.body.appendChild(this.toast);
    await this.toast.present();
  
    await this.toast.onDidDismiss();
  }

}
