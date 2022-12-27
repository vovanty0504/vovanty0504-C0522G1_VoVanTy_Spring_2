import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeModule} from './component/compoment/home/home.module';
import {DecentralizationModule} from './component/compoment/decentralization/decentralization.module';


const routes: Routes = [
  {
    path: '', loadChildren: () => HomeModule,
  },
  {
    path: 'login', loadChildren: () => DecentralizationModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
