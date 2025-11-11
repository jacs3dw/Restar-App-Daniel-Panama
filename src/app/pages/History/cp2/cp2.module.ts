import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cp2PageRoutingModule } from './cp2-routing.module';

import { Cp2Page } from './cp2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cp2PageRoutingModule
  ],
  declarations: [Cp2Page]
})
export class Cp2PageModule {}
