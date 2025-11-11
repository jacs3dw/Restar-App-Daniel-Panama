import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SspPage } from './ssp.page';

const routes: Routes = [
  {
    path: '',
    component: SspPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SspPageRoutingModule {}
