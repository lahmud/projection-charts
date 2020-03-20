import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartJsComponent } from './chart-js/chart-js/chart-js.component';


const routes: Routes = [
  {
    path: 'chartjs',
    component: ChartJsComponent
  },
  {
    path: '',
    component: ChartJsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
