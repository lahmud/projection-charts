import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class ChartJsComponent implements OnInit {
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


  ngOnInit() {
    this.generateLabels();
    this.generateData();
    this.renderChart();
  }

  generateLabels() {
    for (let i = 0; i <= (this.maxXAxis - this.startYear); i++) {
      for (let j = 1; j < 13; j++) {
        const val = j + (i * 12);
        this.labels.push(val);
      }
    }
  }

  generateData() {
    this.generateImmediateWithdrawal();
    this.generateStandardCaseReturn();
    this.generateBestCaseReturn();
    this.generateWorstCaseReturn();
    this.generateNoActionCaseReturn();
  }

  // Becomes a linear depletion
  generateImmediateWithdrawal() {
    this.withdrawalAmount = this.totalAccountValue / (this.endYear - this.startYear) / this.months.length;
    for (let i = 0; i <= (this.endYear - this.startYear) * this.months.length; i++) {
      const val = this.totalAccountValue - (this.withdrawalAmount * i);
      this.immediateWithdrawalReturnCase.push(val);
    }
  }


  generateStandardCaseReturn() {
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        this.standardReturnCase.push(this.totalAccountValue);
        continue;
      }

      // Stop populating if the last item was 0
      if (this.standardReturnCase[i - 1] === 0) {
        break;
      }

      let val = (this.standardReturnCase[i - 1] - this.withdrawalAmount) * (1 + (this.standardReturnRate / this.months.length));
      val = val >= 0 ? val : 0;
      this.standardReturnCase.push(val)
    }
  }

  generateWorstCaseReturn() {
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        this.worstReturnCase.push(this.totalAccountValue);
        continue;
      }

      let val = (this.worstReturnCase[i - 1] - this.withdrawalAmount) * (1 + (this.worstReturnRate / this.months.length));
      val = val >= 0 ? val : 0;
      this.worstReturnCase.push(val);
    }
  }

  generateBestCaseReturn() {
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        this.bestReturnCase.push(this.totalAccountValue);
        continue;
      }

      let val = (this.bestReturnCase[i - 1] - this.withdrawalAmount) * (1 + (this.bestReturnRate / this.months.length));
      val = val >= 0 ? val : 0;
      this.bestReturnCase.push(val);
    }
  }

  generateNoActionCaseReturn() {
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        this.noActionReturnCase.push(this.totalAccountValue);
        continue;
      }

      let val = this.noActionReturnCase[i - 1] * (1 + (this.standardReturnRate / this.months.length));
      val = val >= 0 ? val : 0;
      this.noActionReturnCase.push(val);
    }
  }

  convertMonthToYear(value, index, values) {
    return (Math.floor(value / 12)) + this.startYear;
  }

  renderChart() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Full Withdrawal',
            fill: true,
            data: this.immediateWithdrawalReturnCase,
            borderDash: [5],
            borderWidth: 1,
            backgroundColor: 'rgba(0,0,0,0)',
            pointBackgroundColor: 'rgba(0,0,0,0.0)',
            pointBorderColor: 'rgba(0,0,0,0.0)',
            borderColor: 'rgba(0, 0, 0, 1.0)',
          },
          {
            label: 'No Action',
            fill: true,
            data: this.noActionReturnCase,
            borderDash: [5],
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0,0,0,0.0)',
            pointBorderColor: 'rgba(0,0,0,0.0)',
            borderColor: 'rgba(153, 0, 204, 1.0)',
            backgroundColor: 'rgba(153, 0, 204, 0)',
          },
          {
            label: 'Standard Return',
            fill: true,
            data: this.standardReturnCase,
            borderWidth: 1,
            pointBackgroundColor: 'rgba(0,0,0,0.0)',
            pointBorderColor: 'rgba(0,0,0,0.0)',
            borderColor: 'rgba(0, 0, 204, 1.0)',
            backgroundColor: 'rgba(0, 0, 204, 0)',
          },
          {
            label: 'Worst Return',
            fill: 2,
            data: this.worstReturnCase,
            borderWidth: 1,
            backgroundColor: 'rgba(244,0,0,0.2)',
            pointBackgroundColor: 'rgba(0,0,0,0.0)',
            pointBorderColor: 'rgba(0,0,0,0.0)',
            borderColor: 'rgba(0, 0, 204, 0)',
          },
          {
            label: 'Best Return',
            fill: 3,
            data: this.bestReturnCase,
            borderDash: [5],
            borderWidth: 1,
            backgroundColor: 'rgba(226,236,244,0.8)',
            pointBackgroundColor: 'rgba(0,0,0,0.0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            borderColor: 'rgba(0, 0, 204, 0)',
          },
        ]
      },
      options: {
        animation: {
          duration: 0 // general animation time
        },
        hover: {
          animationDuration: 0 // duration of animations when hovering an item
        },
        responsiveAnimationDuration: 0, // animation duration after a resize
        responsive: false,
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Age'
            },
            ticks: {
              beginAtZero: false,
              callback: this.convertMonthToYear.bind(this)
            },
            gridLines: {
              drawTicks: true
            }
          }],
          yAxes: [{
            ticks: {
              callback: (value, index, values) => { return formatCurrency(value, 'en', '$', 'USD') }
            }
          }]
        }
      }
    });
  }
}
