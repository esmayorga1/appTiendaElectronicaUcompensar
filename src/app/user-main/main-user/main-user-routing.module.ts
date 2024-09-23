import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainUserPage } from './main-user.page';

const routes: Routes = [
  {
    path: '',
    component: MainUserPage
  },
  {
    path: 'main-user',
    loadChildren: () => import('./main-user.module').then( m => m.MainUserPageModule)
  },
    
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainUserPageRoutingModule {}
