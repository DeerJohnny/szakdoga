import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class GameDataServices {

  constructor(protected afs: AngularFirestore, private storage: Storage) { }

  async get() {
    let siker = false;
    let array = [];
    let resultData = this.afs.firestore.collection(`gameResults`);
    await resultData.get().then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        if (doc.data()) {
          siker = true;
          let result = doc.data();
          if (result.reference === await this.storage.get('user')) {
            array.push(result);
          }
        }
      })
      console.log(array);
      return array;
    })   
  }
  
}