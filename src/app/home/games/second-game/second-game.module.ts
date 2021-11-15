import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondGamePageRoutingModule } from './second-game-routing.module';

import { SecondGamePage } from './second-game.page';
import { SecondGamePageModule } from 'coggames2';

@NgModule({
  imports: [
    SecondGamePageModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SecondGamePageRoutingModule
  ],
  declarations: [SecondGamePage]
})
export class SecondGPageModule {}
