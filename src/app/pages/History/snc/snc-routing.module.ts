import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SncPage } from './snc.page';

const routes: Routes = [
  {
    path: '',
    component: SncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SncPageRoutingModule {}
