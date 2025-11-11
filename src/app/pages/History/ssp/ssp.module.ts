import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SspPageRoutingModule } from './ssp-routing.module';

import { SspPage } from './ssp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SspPageRoutingModule
  ],
  declarations: [SspPage]
})
export class SspPageModule {}
