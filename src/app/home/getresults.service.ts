import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Storage } from '@ionic/storage';
import * as XLSX from 'xlsx';
import { ToastController } from '@ionic/angular';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root'
})

export class GameDataServices {

  constructor(protected afs: AngularFirestore, private storage: Storage, public toastController: ToastController) { }
  
  toast: any;

  get(user: string) {
    this.afs.firestore.collection(`gameResults`).get().then(async (querySnapshot) => {
      const sheet = {};
      const sheetData = [];
      let i=0;
      querySnapshot.forEach((doc) => {
        i++;  
        if (doc.data()) {
          let result = doc.data();
          if (result.reference === user) {
            const line = {};
            line['Kitöltő'] = result.reference;
            line['Kitöltési idő'] = result.authored;
            line['Játék'] = result.game;
            line['Fáradtság'] = result.faradtsag;
            line['Stressz'] = result.stressz;
            line['Átlag reakcióidő'] = result.item.average;
            line['Leggyorsabb reakcióidő'] = result.item.fastest;
            line['Pontszám'] = result.item.score;
            line['Sorozat'] = result.item.streak;
            sheetData.push(line);
          }
        }
        if (i === querySnapshot.size && sheetData.length > 0) {
          sheet['Summary'] = XLSX.utils.json_to_sheet(sheetData);
      
          const workbook: XLSX.WorkBook = { Sheets: sheet, SheetNames: ['Summary'] };
          const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    
          const url = window.URL.createObjectURL(blob);
          const fileLink = document.createElement('a');
          fileLink.href = url;
          fileLink.download = user + '.xlsx';
          fileLink.click();
          fileLink.remove();
          console.log("sikeres letöltés");
        } else if (i === querySnapshot.size && sheetData.length === 0){
          this.noData()
        }
      })
    }) 
  }

  async noData() {
    this.toast = document.createElement('ion-toast');
    this.toast.message = 'Nem található korábbi eredmény, kérem először játszon a játékokkal!';
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