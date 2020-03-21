import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})
export class NgxChartsComponent implements OnInit {

  title = 'Rate of Return';
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  labels: number[] = [];
  startYear: number = 65;
  endYear: number = 95;
  totalAccountValue: number = 450000;
  withdrawalAmount: number = 0;
  maxXAxis: number = 120;

  // Data sets
  immediateWithdrawalReturnCase: number[] = [];
  standardReturnCase: number[] = [];
  worstReturnCase: number[] = [];
  bestReturnCase: number[] = [];
  noActionReturnCase: number[] = [];

  // Return rates
  bestReturnRate: number = 0.025;
  standardReturnRate: number = 0.02;
  worstReturnRate: number = 0.01;


  constructor() { }

  ngOnInit(): void {
  }

}
