import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/compoment/login/login.component';
import {NavbarComponent} from './component/compoment/navbar/navbar.component';
import {HomeComponent} from './component/compoment/home/home.component';
import {FooterComponent} from './component/compoment/footer/footer.component';
import {ComputerDetailComponent} from './component/compoment/computer-detail/computer-detail.component';
import {CartComponent} from './component/compoment/cart/cart.component';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    ComputerDetailComponent,
    CartComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
