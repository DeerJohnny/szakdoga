import { Component, OnInit } from '@angular/core';
import { QuestionnaireResponseServiceService } from '../services/questionnaire-response-service.service';
import { Storage } from '@ionic/storage';
import { Router } from  "@angular/router";

@Component({
  selector: 'third-game',
  templateUrl: './third-game.page.html',
  styleUrls: ['./third-game.page.scss'],
})
export class ThirdGamePage implements OnInit {

  constructor(private storage: Storage, private service: QuestionnaireResponseServiceService, private  router:  Router) { }

  ngOnInit() {
  }

  async saveResult(result) {
    this.service.uploadGameData(result, await this.storage.get('user'));
    this.router.navigate(['/home']);
  }
}
