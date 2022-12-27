import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ComputerDetailComponent} from './computer-detail/computer-detail.component';
import {CartComponent} from './cart/cart.component';
import {AuthGuard} from '../decentralization/auth.guard';
import {HistoryComponent} from './history/history.component';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {EditLaptopComponent} from './edit-laptop/edit-laptop.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'detail/:id', component: ComputerDetailComponent
  },
  {
    path: 'cart',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: CartComponent
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_CUSTOMER']
    },
    component: HistoryComponent
  },
  {
    path: 'customer', component: CustomerDetailComponent
  },
  {
    path: 'edit/:id', component: EditLaptopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
