import { Component, OnInit } from '@angular/core';
import * as createjs from 'createjs-module';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from "rxjs/operators";
import { GameVariable } from '../game_vars';
import { Output, EventEmitter, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';


@Component({
  selector: 'app-second-game',
  templateUrl: './second-game.page.html',
  styleUrls: ['./second-game.page.scss'],
  host: {
    '(window:resize)': 'onResize()'
  },
  providers: [GameVariable]
})
export class SecondGamePage implements OnInit {

  @Input() optScale: number = 1;

  @Output() results = new EventEmitter<{ score: number, streak: number, fastest: number, average: number, when: Date }>();

  constructor(private gameVars: GameVariable) { }

  startScreenWidth = window.innerWidth;
  public divHeigth = 98;
  grayNumCircle: any;
  szamok: any;
  formak: any;
  alsok: any;
  numCircle: any;
  keret: any;
  circle: any;
  canvasVisible: Boolean;
  tutorialVisible1: Boolean;
  tutorialVisible2: Boolean;
  tutorialVisible3: Boolean;
  tempTime: any;
  beforeTime: any;
  fastest: any;
  average: any;
  db: any;
  before = window.innerWidth;
  started: any;
  score: any;
  streak: any;
  maxStreak: any;
  celpont: any;
  poz: any;
  first: any;
  removedCount: any;
  timeLeft: any;
  timeLeftString: any;
  elso: any;
  stage: any;
  when: Date;

  ngOnInit() {
    this.divHeigth = this.optScale * 98;
    this.stage = new createjs.Stage("gameCanvas");
    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight * 0.95 * this.optScale;
  
    this.tutorialVisible1 = true;
    this.tutorialVisible2 = false;
    this.tutorialVisible3 = false;
    window.addEventListener("keypress", async function(event){
      await this.test()
    })
   
  }

  async test(event){

    console.log(event);
    }

  firstTut() {
    this.tutorialVisible1 = true;
    this.tutorialVisible2 = false;
    this.tutorialVisible3 = false;
  }

  secondTut() {
    this.tutorialVisible1 = false;
    this.tutorialVisible2 = true;
    this.tutorialVisible3 = false;
  }

  thirdTut() {
    this.tutorialVisible1 = false;
    this.tutorialVisible2 = false;
    this.tutorialVisible3 = true;
  }


  loadGame() {

    this.tutorialVisible3 = false;
    this.canvasVisible = true;
  
    const actDate = new Date();
    const timeZoneDifferenceS = (actDate.getTimezoneOffset() / 60) * -1;
    actDate.setTime(actDate.getTime() + (timeZoneDifferenceS * 60) * 60 * 1000);
    this.when = actDate;
    
    let scale = window.innerWidth / this.startScreenWidth;
    if (scale > window.innerWidth / this.gameVars.standardScreenWidth) scale = window.innerWidth / this.gameVars.standardScreenWidth;

    this.formak = this.loadImage(['s_circleCircle.png', 's_circleHaromszog.png', 's_circleNegyzet.png', 's_circleOtszog.png', 's_circleHatszog.png', 's_circleX.png']);
    this.circle = this.loadImage(['circle.png']);

    this.shuffle(this.formak);
    console.log(this.formak);

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", this.stage);

    this.start();

    const helyes = (evt: { currentTarget: { id: any; }; }) => {
      let scale = window.innerWidth / this.startScreenWidth;
      if (scale > window.innerWidth / this.gameVars.standardScreenWidth) scale = window.innerWidth / this.gameVars.standardScreenWidth;

      if (this.started == 0) this.startGame();
      this.started = 1;

      if (this.stage.getChildAt(this.celpont).id == evt.currentTarget.id) {

        createjs.Ticker.paused = true;
        this.tempTime = createjs.Ticker.getTime() - this.beforeTime;
        this.beforeTime = createjs.Ticker.getTime();

        this.stage.getChildAt(this.celpont).visible = true;
        this.stage.getChildAt(this.celpont - 2).visible = false;

        this.score++;

        this.playAudio(0);

        this.stage.getChildAt(this.celpont).filters = [
          new createjs.ColorFilter(1, 1, 1, 1, 0, 255, 0, 0)
        ];
        this.stage.getChildAt(this.celpont).cache(0, 0, 200, 200);

        setTimeout(async () => (this.resetFilter(this.celpont)), 200);

        this.createForm();
        this.moveNumber();

        this.streak++;

        if (this.maxStreak < this.streak) {
          this.maxStreak = this.streak;
        }
        if (this.tempTime < this.fastest && this.db > 1) {
          this.fastest = this.tempTime;

        }
        this.average += this.tempTime;
        this.db++;
      } else {
        this.playAudio(1);
        if (this.maxStreak < this.streak) {
          this.maxStreak = this.streak;
        }
        this.streak = 0;
        this.stage.getChildAt(this.celpont - 2).filters = [
          new createjs.ColorFilter(0, 0, 0, 1, 255, 0, 0, 0)
        ];
        this.stage.getChildAt(this.celpont - 2).cache(0, 0, 200, 200);

        setTimeout(async () => (this.resetFilter(this.celpont)), 200);
      }
      createjs.Ticker.paused = false;
      if (this.score > 0) {
        this.stage.getChildAt(this.celpont - 4).scaleX = scale * this.gameVars.s_scale;
        this.stage.getChildAt(this.celpont - 4).scaleY = scale * this.gameVars.s_scale;
      }
    }

  }

  loadImage(names: string[]) {
    let array: createjs.Bitmap[] = [];
    let path: string;
    names.forEach((value, index) => {
      path = "assets/images/" + value;
      array[index] = new createjs.Bitmap(path);
    })
    return array;
  }

  shuffle(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  async resetFilter(id: number) {

    this.stage.getChildAt(id - 1).filters = [
      new createjs.ColorFilter(0, 0, 0, 1, 50, 205, 50, 0)
    ];
    this.stage.getChildAt(id - 1).cache(0, 0, 200, 200);

    this.stage.getChildAt(id - 2).filters = [
      new createjs.ColorFilter(0, 0, 0, 1, 50, 205, 50, 0)
    ];
    this.stage.getChildAt(id - 2).cache(0, 0, 200, 200);
    
    this.stage.getChildAt(id - 3).filters = [
      new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0)
    ];
    this.stage.getChildAt(id - 3).cache(0, 0, 200, 200);
  }

  playAudio(id: number) {

    var sound = ["assets/sound/correct.wav",
                 "assets/sound/wrong.wav"];

    let audio = new Audio();
    audio.src = sound[id];

    audio.load();
    audio.play();

  }

  start() {
    this.tutorialVisible3 = false;
    this.canvasVisible = true;
    this.timeLeft = this.gameVars.timeLeft;
    this.timeLeftString = this.gameVars.timeLeftString;
    this.db = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.poz = 0;
    this.removedCount = 0;
    this.score = 0;
    this.started = 0;
    this.fastest = Number.MAX_SAFE_INTEGER;
    this.average = 0;
    this.first = this.stage.getNumChildren();
    this.createStart();
  }

  async endGame() {
    this.average = this.average / 1000 / this.db;
    this.fastest /= 1000;

    this.results.emit({ score: this.score, streak: this.streak, fastest: this.fastest, average: this.average, when: this.when });

    this.timeLeftString = "";
    this.stage.removeAllChildren();
    this.stage = null;
  }

  SetTimer(): Subscription {
    return interval(1000)
      .pipe(
        filter(() => this.timeLeft > 0),
        tap(() => {
          this.timeLeft--;
          let min = "0" + Math.floor(this.timeLeft / 60);
          let sec = "" + this.timeLeft % 60;
          if ((this.timeLeft % 60) < 10) sec = "0" + sec;
          this.timeLeftString = min + ":" + sec + "  ";
        }))
      .subscribe();
  }

  startGame() {
    this.SetTimer();
    this.beforeTime = createjs.Ticker.getTime();
    setTimeout(async () => (this.endGame()), 120000);
  }

  createStart() {
    let forma = [];
    let rand = Math.floor(Math.random() * 6);

    let kor = [];

    let newScale = window.innerWidth / this.startScreenWidth;
    if (newScale > window.innerWidth / this.gameVars.standardScreenWidth) newScale = window.innerWidth / this.gameVars.standardScreenWidth;

    kor[0] = this.circle[0].clone();

    forma[0] = this.formak[rand].clone();
    forma[0].id = this.formak[rand].id;
    forma[0].x = window.innerWidth - window.innerWidth * (1 - (0 + 1) / 7);
    forma[0].y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
    forma[0].scaleX = newScale * this.gameVars.s_scale;
    forma[0].scaleY = newScale * this.gameVars.s_scale;
    forma[0].name = "forma";

    kor[0].x = window.innerWidth - window.innerWidth * (1 - (0 + 1) / 7);
    kor[0].y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
    kor[0].scaleX = newScale * this.gameVars.s_scale;
    kor[0].scaleY = newScale * this.gameVars.s_scale;
    kor[0].name = "kor";


    this.stage.addChildAt(kor[0], this.first + this.poz);
    this.stage.getChildAt(this.first + this.poz).visible = false;
    this.poz++;

    this.stage.addChildAt(forma[0], this.first + this.poz);
    this.stage.getChildAt(this.first + this.poz).visible = true;
    this.poz++;

    for (let db = 1; db < 6; db++) {

      rand = Math.floor(Math.random() * 6);

      kor[db] = this.circle[0].clone();

      forma[db] = this.formak[rand].clone();
      forma[db].id = this.formak[rand].id;
      forma[db].x = window.innerWidth - window.innerWidth * (1 - (db + 1) / 7);
      forma[db].y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
      forma[db].scaleX = newScale * this.gameVars.s_scale;
      forma[db].scaleY = newScale * this.gameVars.s_scale;
      forma[db].name = "forma";

      kor[db].x = window.innerWidth - window.innerWidth * (1 - (db + 1) / 7);
      kor[db].y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
      kor[db].scaleX = newScale * this.gameVars.s_scale;
      kor[db].scaleY = newScale * this.gameVars.s_scale;
      kor[db].name = "kor";


      this.stage.addChildAt(kor[db], this.first + this.poz);
      this.stage.getChildAt(this.first + this.poz).visible = false;
      this.poz++;

      this.stage.addChildAt(forma[db], this.first + this.poz);
      this.stage.getChildAt(this.first + this.poz).visible = true;
      this.poz++;
    }
    this.stage.update();
    this.celpont = this.first + 2;

    this.stage.getChildAt(this.celpont - 1).scaleX = newScale * this.gameVars.s_scale * 1.2;
    this.stage.getChildAt(this.celpont - 1).scaleY = newScale * this.gameVars.s_scale * 1.2;

    this.stage.getChildAt(this.celpont - 2).scaleX = newScale * this.gameVars.s_scale * 1.2;
    this.stage.getChildAt(this.celpont - 2).scaleY = newScale * this.gameVars.s_scale * 1.2;
  }

  createForm() {
    let forma: any;
    let rand = Math.floor(Math.random() * 6);

    let kor = this.circle[0].clone();

    let newScale = window.innerWidth / this.startScreenWidth;
    if (newScale > window.innerWidth / this.gameVars.standardScreenWidth) newScale = window.innerWidth / this.gameVars.standardScreenWidth;

    forma = this.formak[rand].clone();
    forma.id = this.formak[rand].id;
    forma.x = window.innerWidth;
    forma.y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
    forma.scaleX = newScale * this.gameVars.s_scale;
    forma.scaleY = newScale * this.gameVars.s_scale;
    forma.name = "forma";

    kor.x = window.innerWidth;
    kor.y = window.innerHeight / this.gameVars.s_formaPos * this.optScale;
    kor.scaleX = newScale * this.gameVars.s_scale;
    kor.scaleY = newScale * this.gameVars.s_scale;
    kor.name = "kor";

    kor.filters = [
      new createjs.ColorFilter(0, 0, 0, 1, 170, 170, 170, 0)
    ];
    kor.cache(0, 0, 200, 200);

    this.stage.addChildAt(kor, this.first + this.poz - this.removedCount);
    this.poz++;

    this.stage.addChildAt(forma, this.first + this.poz - this.removedCount);
    this.stage.getChildAt(this.first + this.poz - this.removedCount).visible = false;

    this.celpont = this.first + this.poz - this.removedCount - 12;
    this.poz++;

    this.stage.getChildAt(this.celpont - 1).scaleX = newScale * this.gameVars.s_scale * 1.2;
    this.stage.getChildAt(this.celpont - 1).scaleY = newScale * this.gameVars.s_scale * 1.2;

    this.stage.getChildAt(this.celpont - 2).scaleX = newScale * this.gameVars.s_scale * 1.2;
    this.stage.getChildAt(this.celpont - 2).scaleY = newScale * this.gameVars.s_scale * 1.2;

  }

  moveNumber() {
    for (var i = this.first; i < this.first + this.poz - this.removedCount; i++) {
      createjs.Tween.get(this.stage.getChildAt(i), { override: true }).to({ x: this.stage.getChildAt(i).x - window.innerWidth / 6.5 }, 700, createjs.Ease.getPowOut(4));

      if (this.stage.getChildAt(i).x < 0) {
        this.removeNumber(i);
        i--;
      }
    }
  }

  removeNumber(number: number) {
    this.stage.removeChildAt(number);
    this.removedCount++;
    this.celpont--;
  }


  onResize() {

    this.divHeigth = this.optScale * 98;

    var screenWidth = window.innerWidth;
    var screenHeigth = window.innerHeight;

    this.stage.canvas.width = window.innerWidth;
    this.stage.canvas.height = window.innerHeight * 0.95;

    var newScale = screenWidth / this.startScreenWidth;
    var scale = screenWidth / this.before;
    this.before = screenWidth;
    if (newScale > window.innerWidth / this.gameVars.standardScreenWidth) newScale = window.innerWidth / this.gameVars.standardScreenWidth;

    for (let i = this.first; i < this.stage.getNumChildren(); i++) {

      if (this.stage.getChildAt(i).name == "forma" || this.stage.getChildAt(i).name == "kor") {
        this.stage.getChildAt(i).x *= scale;
        this.stage.getChildAt(i).y = screenHeigth / this.gameVars.s_formaPos * this.optScale;
        this.stage.getChildAt(i).scaleX = newScale * this.gameVars.s_scale;
        this.stage.getChildAt(i).scaleY = newScale * this.gameVars.s_scale;
      }
    }

  }

}
