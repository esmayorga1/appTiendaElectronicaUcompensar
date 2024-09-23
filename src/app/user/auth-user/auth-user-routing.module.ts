import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthUserPage } from './auth-user.page';

const routes: Routes = [
  {
    path: '',
    component: AuthUserPage
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthUserPageRoutingModule {}
