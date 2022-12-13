import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ComputerDetailComponent} from './computer-detail/computer-detail.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'detail/:id', component: ComputerDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
