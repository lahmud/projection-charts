import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';


const routes: Routes = [
  {
    path: 'chartjs',
    component: ChartJsComponent
  },
  {
    path: 'ngx-charts',
    component: NgxChartsComponent
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
