import { Component, OnInit } from '@angular/core';
import { QuestionnaireResponseServiceService } from '../services/questionnaire-response-service.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-second-g',
  templateUrl: './second-game.page.html',
  styleUrls: ['./second-game.page.scss']
})
export class SecondGamePage implements OnInit { 

  constructor(private storage: Storage, private service: QuestionnaireResponseServiceService) { }

  ngOnInit() {
  }

  async saveResult(result) {
    this.service.uploadGameData(result, await this.storage.get('user'));
  }

}
