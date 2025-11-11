import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Snc1Page } from './snc1.page';

const routes: Routes = [
  {
    path: '',
    component: Snc1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Snc1PageRoutingModule {}
