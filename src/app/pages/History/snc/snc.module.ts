import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SncPageRoutingModule } from './snc-routing.module';

import { SncPage } from './snc.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SncPageRoutingModule
  ],
  declarations: [SncPage]
})
export class SncPageModule {}
