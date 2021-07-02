import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ThirdGamePage } from './third-game.page';

const routes: Routes = [
  {
    path: '',
    component: ThirdGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ThirdGamePageRoutingModule {}
