import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from  "@angular/router";
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private storage: Storage, private afs: AngularFirestore, private  router:  Router, public toastController: ToastController,) { }

  private users = [] as any;
  toast: any;

  register(regemail, regpass, regname) {
    const qres = {} as any;
    qres.authored = new Date().toISOString();
    qres.name = regname;
    qres.email = regemail;
    qres.password = regpass;
    console.log(qres);
    this.afs.collection('users').add(qres);
  }

  login(logemail: string, logpass: string) {
    this.getUsers(logemail, logpass);
  }

  async wrongLogin() {
    this.toast = document.createElement('ion-toast');
    this.toast.message = 'Hibás bejelentkezési adatok!';
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

  hideToast() {
    if (this.toast) {
      this.toast.dismiss();
    }
  }

  getUsers(logemail: string, logpass: string) {
    let siker = false;
    let userDoc = this.afs.firestore.collection(`users`);
    userDoc.get().then((querySnapshot) => { 
      querySnapshot.forEach((doc) => {
        if (doc.data()) {
          let user = doc.data();
          if (user.email === logemail && user.password === logpass) {
            console.log(user);
            if (user.name) {
              this.storage.set('user', user.name);
            } else this.storage.set('user', 'vendég');
            this.router.navigateByUrl('home');
            siker = true;
          }
        }
      })
      if (!siker) this.wrongLogin();
    })
    
  }

}
