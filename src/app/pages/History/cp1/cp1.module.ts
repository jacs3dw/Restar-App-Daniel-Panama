import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cp1PageRoutingModule } from './cp1-routing.module';

import { Cp1Page } from './cp1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cp1PageRoutingModule
  ],
  declarations: [Cp1Page]
})
export class Cp1PageModule {}
