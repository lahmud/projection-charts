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

  multi: any[] = [
    {
      "name": "North Korea",
      "series": [
        {
          "value": 3445,
          "name": "2016-09-24T04:55:30.119Z",
          "min": 3172,
          "max": 3718
        },
        {
          "value": 6149,
          "name": "2016-09-14T17:42:33.680Z",
          "min": 5606,
          "max": 6692
        },
        {
          "value": 4229,
          "name": "2016-09-22T03:36:11.380Z",
          "min": 4125,
          "max": 4333
        },
        {
          "value": 3266,
          "name": "2016-09-15T08:33:37.593Z",
          "min": 3007,
          "max": 3525
        },
        {
          "value": 2005,
          "name": "2016-09-23T06:56:37.961Z",
          "min": 1915,
          "max": 2095
        }
      ]
    },
    {
      "name": "Montenegro",
      "series": [
        {
          "value": 4727,
          "name": "2016-09-24T04:55:30.119Z",
          "min": 4266,
          "max": 5188
        },
        {
          "value": 4264,
          "name": "2016-09-14T17:42:33.680Z",
          "min": 4099,
          "max": 4429
        },
        {
          "value": 6027,
          "name": "2016-09-22T03:36:11.380Z",
          "min": 5888,
          "max": 6166
        },
        {
          "value": 3781,
          "name": "2016-09-15T08:33:37.593Z",
          "min": 3689,
          "max": 3873
        },
        {
          "value": 3494,
          "name": "2016-09-23T06:56:37.961Z",
          "min": 3326,
          "max": 3662
        }
      ]
    }
  ];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() {
  }

  ngOnInit(): void {
    // throw new Error("Method not implemented.");
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
