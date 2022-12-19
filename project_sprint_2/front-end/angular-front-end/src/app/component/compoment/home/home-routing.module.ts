import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ComputerDetailComponent} from './computer-detail/computer-detail.component';
import {CartComponent} from './cart/cart.component';
import {AuthGuard} from '../decentralization/auth.guard';


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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
