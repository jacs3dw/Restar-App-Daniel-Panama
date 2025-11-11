import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnborPage } from './onbor.page';

const routes: Routes = [
  {
    path: '',
    component: OnborPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnborPageRoutingModule {}
