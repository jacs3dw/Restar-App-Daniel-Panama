import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Cp3PageRoutingModule } from './cp3-routing.module';

import { Cp3Page } from './cp3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Cp3PageRoutingModule
  ],
  declarations: [Cp3Page]
})
export class Cp3PageModule {}
