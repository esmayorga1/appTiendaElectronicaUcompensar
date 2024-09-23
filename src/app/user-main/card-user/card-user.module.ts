import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardUserPageRoutingModule } from './card-user-routing.module';

import { CardUserPage } from './card-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CardUserPageRoutingModule
  ],
  declarations: [CardUserPage]
})
export class CardUserPageModule {}
