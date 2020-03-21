import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartJsComponent } from './chart-js/chart-js.component';
import { NgxChartsComponent } from './ngx-charts/ngx-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartJsComponent,
    NgxChartsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
