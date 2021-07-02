import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThirdGamePageRoutingModule } from './third-game-routing.module';

import { ThirdGamePage } from './third-game.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ThirdGamePageRoutingModule
  ],
  declarations: [ThirdGamePage]
})
export class ThirdGamePageModule {}
