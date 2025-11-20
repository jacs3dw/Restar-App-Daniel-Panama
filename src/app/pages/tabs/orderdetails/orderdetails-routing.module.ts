import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderdetailsPage } from './orderdetails.page';

const routes: Routes = [
  {
    path: '',
    component: OrderdetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderdetailsPageRoutingModule {}
