import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './component/compoment/home/home.component';
import {ComputerDetailComponent} from './component/compoment/computer-detail/computer-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'detail/:id', component: ComputerDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
