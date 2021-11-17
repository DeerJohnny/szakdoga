import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { QuestionnaireResponseServiceService } from '../services/questionnaire-response-service.service';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-first-game',
  templateUrl: './first-game.page.html',
  styleUrls: ['./first-game.page.scss'],
})
export class FirstGamePage implements OnInit {
  
  testData: any;
  questRes: any;

  constructor(private storage: Storage, private service: QuestionnaireResponseServiceService, private  router:  Router) { }

  ngOnInit() {
  }

  async saveResult(result) {
    this.service.uploadGameData(result, await this.storage.get('user'), 'első játék');
    this.router.navigate(['/home']);
  }

}
