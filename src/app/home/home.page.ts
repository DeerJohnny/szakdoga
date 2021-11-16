import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { Storage } from '@ionic/storage';
import { GameDataServices } from './getresults.service';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  list: any;

  constructor(private storage: Storage, private  router:  Router, private service: GameDataServices) {}

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

  logout() {
    this.storage.remove('user')
    this.router.navigate(['/login']);
  }

  downloadAllTest() {
    this.list = this.service.get();
    console.log(this.list);
    /*const sheetData = [];
    const sheet = {};
    this.list.forEach(item => {
      const line = {};
      line['Páciens'] = item.data.item.patient;
      line['Kitöltés dátuma'] = item.data.authored;
      line['Globális átlag reakció'] = item.data.item.globalReactionTime;
      line['Globális medián'] = item.data.item.globalMedian;
      line['Globális szórás'] = item.data.item.globalSTD;
      line['Teszt befejezése'] = item.data.item.testEnded;
      sheetData.push(line);});
    sheet['Summary'] = XLSX.utils.json_to_sheet(sheetData);
    
    for (let i=1;i<15;i++) {
      let block = i + ". blokk";
      const sheetData = [];
      
      await this.list.forEach(item => {
        const line = {};
        if (item.data.item[block] != undefined) {
          line['Jó válasz'] = item.data.item[block].goodAnsw;
          line['Reakció jó válaszra'] = item.data.item[block].goodReaction;
          line['Szórás jó válaszra'] = item.data.item[block].goodReactionSTD;
          line['Medián jó válaszra'] = item.data.item[block].goodReactionMedian;
          line['Rossz válasz'] = item.data.item[block].badAnsw;
          line['Reakció rossz válaszra'] = item.data.item[block].badReaction;
          line['Szórás rossz válaszra'] = item.data.item[block].badReactionSTD;
          line['Medián rossz válaszra'] = item.data.item[block].badReactionMedian;
          line['Átlag reakció'] = item.data.item[block].avgReact;
          line['Medián'] = item.data.item[block].avgReactMedian;
          line['Szórás'] = item.data.item[block].avgReactSTD;
          line['Blokk kitöltés kezdete'] = item.data.item[block].started;
        } else {
          line['Jó válasz'] = '';
          line['Reakció jó válaszra'] = '';
          line['Szórás jó válaszra'] = '';
          line['Medián jó válaszra'] = '';
          line['Rossz válasz'] = '';
          line['Reakció rossz válaszra'] = '';
          line['Szórás rossz válaszra'] = '';
          line['Medián rossz válaszra'] = '';
          line['Átlag reakció'] = '';
          line['Medián'] = '';
          line['Szórás'] = '';
          line['Blokk kitöltés kezdete'] = '';
        }
        sheetData.push(line);
        
      });
      sheet[block] = XLSX.utils.json_to_sheet(sheetData);
    }
    const workbook: XLSX.WorkBook = { Sheets: sheet, SheetNames: ['Summary', '1. blokk', '2. blokk', '3. blokk', '4. blokk', '5. blokk', '6. blokk', '7. blokk', '8. blokk', '9. blokk', '10. blokk', '11. blokk', '12. blokk', '13. blokk', '14. blokk'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });

    const url = window.URL.createObjectURL(blob);
    const fileLink = document.createElement('a');
    fileLink.href = url;
    fileLink.download = 'AllTestSummary.xlsx';
    fileLink.click();
    fileLink.remove(); */
  }  
}
