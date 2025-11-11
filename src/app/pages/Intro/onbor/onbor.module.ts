import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OnborPageRoutingModule } from './onbor-routing.module';

import { OnborPage } from './onbor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnborPageRoutingModule
  ],
  declarations: [OnborPage]
})
export class OnborPageModule {}
