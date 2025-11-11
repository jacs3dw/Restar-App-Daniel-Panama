import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Snc1PageRoutingModule } from './snc1-routing.module';

import { Snc1Page } from './snc1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Snc1PageRoutingModule
  ],
  declarations: [Snc1Page]
})
export class Snc1PageModule {}
