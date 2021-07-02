import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstGamePageRoutingModule } from './first-game-routing.module';

import { FirstGamePage } from './first-game.page';

import { CoggamesModule } from 'coggames';

@NgModule({
  imports: [
    CoggamesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    FirstGamePageRoutingModule
  ],
  declarations: [FirstGamePage]
})
export class FirstGamePageModule {}
