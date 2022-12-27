import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {ComputerDetailComponent} from './computer-detail/computer-detail.component';
import {CartComponent} from './cart/cart.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HistoryComponent} from './history/history.component';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {CustomerDetailComponent} from './customer-detail/customer-detail.component';
import {EditLaptopComponent} from './edit-laptop/edit-laptop.component';


@NgModule({
  declarations: [
    HomeComponent,
    ComputerDetailComponent,
    CartComponent,
    HistoryComponent,
    CustomerDetailComponent,
    EditLaptopComponent],
  exports: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    NgbPaginationModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
