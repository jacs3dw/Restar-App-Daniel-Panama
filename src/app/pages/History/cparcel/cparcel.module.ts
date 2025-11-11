import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CparcelPageRoutingModule } from './cparcel-routing.module';

import { CparcelPage } from './cparcel.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CparcelPageRoutingModule
  ],
  declarations: [CparcelPage]
})
export class CparcelPageModule {}
