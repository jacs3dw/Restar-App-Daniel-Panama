import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cp2Page } from './cp2.page';

const routes: Routes = [
  {
    path: '',
    component: Cp2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cp2PageRoutingModule {}
