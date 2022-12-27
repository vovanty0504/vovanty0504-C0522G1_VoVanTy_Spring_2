import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ConfirmResetPasswordComponent} from './confirm-reset-password/confirm-reset-password.component';
import {LoginComponent} from './login/login.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'confirm-reset-password/:token', component: ConfirmResetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecentralizationRoutingModule {
}
