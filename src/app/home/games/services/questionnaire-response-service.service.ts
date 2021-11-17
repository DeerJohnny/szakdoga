import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireResponseServiceService {

  constructor(protected afs: AngularFirestore, private storage: Storage) {}

  async uploadGameData(score: any, user: string, game: string) {
    const qres = {} as any;
    qres.reference = user ? user : "vendég";
    qres.authored = new Date().toISOString();
    qres.item = score;
    qres.faradtsag = await this.storage.get("tired") ? await this.storage.get("tired") : 0;
    qres.stressz = await this.storage.get("stress") ? await this.storage.get("stress") : 0;
    qres.game = game;
    this.afs.collection('gameResults').add(qres);
    console.log("sikeres feltöltés:", qres);
  }

}
