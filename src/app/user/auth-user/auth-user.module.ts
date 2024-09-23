import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthUserPageRoutingModule } from './auth-user-routing.module';

import { AuthUserPage } from './auth-user.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainUserPageModule } from 'src/app/user-main/main-user/main-user.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthUserPageRoutingModule,
    SharedModule,
    MainUserPageModule
  ],
  declarations: [AuthUserPage]
})
export class AuthUserPageModule {}
