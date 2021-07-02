import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SecondGamePageRoutingModule } from './second-game-routing.module';

import { SecondGamePage } from './second-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SecondGamePageRoutingModule
  ],
  declarations: [SecondGamePage]
})
export class SecondGamePageModule {}
