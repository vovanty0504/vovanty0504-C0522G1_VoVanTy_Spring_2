import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomeRoutingModule} from './home-routing.module';
import {HomeComponent} from './home/home.component';
import {ComputerDetailComponent} from './computer-detail/computer-detail.component';
import {CartComponent} from './cart/cart.component';
import {FormsModule} from '@angular/forms';


@NgModule({
    declarations: [HomeComponent, ComputerDetailComponent, CartComponent],
    exports: [
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        FormsModule
    ]
})
export class HomeModule {
}
