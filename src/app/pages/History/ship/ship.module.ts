import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipPageRoutingModule } from './ship-routing.module';

import { ShipPage } from './ship.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipPageRoutingModule
  ],
  declarations: [ShipPage]
})
export class ShipPageModule {}
