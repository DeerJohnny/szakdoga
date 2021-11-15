import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdGamePageRoutingModule } from './third-game-routing.module';

import { ThirdGamePage } from './third-game.page';
import { ThirdGamePageModule } from 'coggames3';

@NgModule({
  imports: [
    CommonModule,
    ThirdGamePageModule,
    FormsModule,
    IonicModule,
    ThirdGamePageRoutingModule
  ],
  declarations: [ThirdGamePage]
})
export class ThirdGPageModule {}
