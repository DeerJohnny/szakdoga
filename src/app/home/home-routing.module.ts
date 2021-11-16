import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'first-game',
    loadChildren: () => import('./games/first-game/first-game.module').then( m => m.FirstGamePageModule)
  },
  {
    path: 'second-game',
    loadChildren: () => import('./games/second-game/second-game.module').then( m => m.SecondGPageModule)
  },
  {
    path: 'third-game',
    loadChildren: () => import('./games/third-game/third-game.module').then( m => m.ThirdGPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
