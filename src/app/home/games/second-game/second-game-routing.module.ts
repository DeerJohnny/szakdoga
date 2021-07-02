import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SecondGamePage } from './second-game.page';

const routes: Routes = [
  {
    path: '',
    component: SecondGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SecondGamePageRoutingModule {}
