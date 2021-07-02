import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstTestPage } from './first-test.page';

const routes: Routes = [
  {
    path: '',
    component: FirstTestPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstTestPageRoutingModule {}
