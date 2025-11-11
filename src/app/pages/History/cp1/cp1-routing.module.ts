import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cp1Page } from './cp1.page';

const routes: Routes = [
  {
    path: '',
    component: Cp1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cp1PageRoutingModule {}
