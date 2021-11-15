import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class QuestionnaireResponseServiceService {

  constructor(protected afs: AngularFirestore) {}

  uploadGameData(score: any, user: string) {
    const qres = {} as any;
    qres.reference = user ? user : "vendég";
    qres.authored = new Date().toISOString();
    qres.item = score;
    this.afs.collection('gameResults').add(qres);
  }

}
