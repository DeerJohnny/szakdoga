import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstGamePage } from './first-game.page';

const routes: Routes = [
  {
    path: '',
    component: FirstGamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstGamePageRoutingModule {}
