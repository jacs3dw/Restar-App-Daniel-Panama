import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Snc2PageRoutingModule } from './snc2-routing.module';

import { Snc2Page } from './snc2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Snc2PageRoutingModule
  ],
  declarations: [Snc2Page]
})
export class Snc2PageModule {}
