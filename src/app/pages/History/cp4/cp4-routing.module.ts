import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cp4Page } from './cp4.page';

const routes: Routes = [
  {
    path: '',
    component: Cp4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cp4PageRoutingModule {}
