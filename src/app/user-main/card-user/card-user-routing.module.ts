import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardUserPage } from './card-user.page';

const routes: Routes = [
  {
    path: '',
    component: CardUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardUserPageRoutingModule {}
