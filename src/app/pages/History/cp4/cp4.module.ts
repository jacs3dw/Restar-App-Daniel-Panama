import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cp4PageRoutingModule } from './cp4-routing.module';

import { Cp4Page } from './cp4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cp4PageRoutingModule
  ],
  declarations: [Cp4Page]
})
export class Cp4PageModule {}
