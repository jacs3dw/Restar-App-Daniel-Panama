import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Cp3Page } from './cp3.page';

const routes: Routes = [
  {
    path: '',
    component: Cp3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Cp3PageRoutingModule {}
