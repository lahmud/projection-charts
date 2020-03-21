import { Series } from './../classes/series.class';
import { DataModel } from './../classes/data-model.class';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NgxChartsComponent implements OnInit {

  title = 'Rate of Return';
  months: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  labels: number[] = [];
  startYear: number = 65;
  endYear: number = 95;
  totalAccountValue: number = 450000;
  withdrawalAmount: number = 0;
  maxXAxis: number = 110;
  
  // Return rates
  bestReturnRate: number = 0.025;
  standardReturnRate: number = 0.02;
  worstReturnRate: number = 0.01;

  data: DataModel[] = [];

  // options
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Age';
  yAxisLabel: string = 'Account Value';
  timeline: boolean = false;
  yScaleMin: number = 0;
  yScaleMax: number = 0;
  xScaleMax: number = 0;
  rangeFillOpacity: number = 0.1;
  showRefLines: boolean = true;
  showRefLabels: boolean = true;
  roundDomains: boolean = false;
  xAxisTickFormatting;
  yAxisTickFormatting;

  colorScheme = {
    domain: ['#000000', '#507CA3', '#9900CC']
  };

  ngOnInit(): void {
    this.generateData();
    this.setMaxXScale();
    this.xAxisTickFormatting = this.xAxisFormat.bind(this);
    this.yAxisTickFormatting = this.yAxisFormat.bind(this);
  }

  generateData() {
    this.generateImmediateWithdrawal();
    this.generateStandardCaseReturn();
    this.generateNoActionCaseReturn();
  }

  setMaxXScale() {
    this.xScaleMax = (this.maxXAxis - this.startYear) * 12;
  }

  xAxisFormat(value) {
    return (Math.floor(value / 12)) + this.startYear;
  }

  yAxisFormat(value) {
    return formatCurrency(value, 'en', '$', 'USD');
  }

  // Becomes a linear depletion
  generateImmediateWithdrawal() {
    const immediateData = new DataModel("Immediate Withdrawal");
    this.withdrawalAmount = this.totalAccountValue / (this.endYear - this.startYear) / this.months.length;
    for (let i = 0; i <= (this.endYear - this.startYear) * this.months.length; i++) {
      const val = this.totalAccountValue - (this.withdrawalAmount * i);
      let series = new Series(i, val);
      immediateData.series.push(series)
    }
    this.data.push(immediateData);
  }

  // Partial withdrawal scenario
  generateStandardCaseReturn() {
    const standardData = new DataModel("Standard Return");
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        let series = new Series(i, this.totalAccountValue, this.totalAccountValue, this.totalAccountValue);
        standardData.series.push(series);
        continue;
      }
      
      // Stop populating if the last item was 0
      if (standardData.series[i - 1].value === 0) {
        break;
      }
      
      // Get the slowly depleting value
      let val = (standardData.series[i - 1].value - this.withdrawalAmount) * (1 + (this.standardReturnRate / this.months.length));
      val = val >= 0 ? val : 0;

      // Generate the +/- range
      let minVal = (standardData.series[i - 1].min - this.withdrawalAmount) * (1 + (this.worstReturnRate / this.months.length));
      let maxVal = (standardData.series[i - 1].max - this.withdrawalAmount) * (1 + (this.bestReturnRate / this.months.length));
      
      // Default the minVal to 0 if begnning to drop below
      minVal = minVal < 0 ? 0 : minVal;

      let series = new Series(i, val, minVal, maxVal);
      standardData.series.push(series);
    }
    this.data.push(standardData);
  }

  // Exponentially increasing value
  generateNoActionCaseReturn() {
    const noActionData = new DataModel("No Action");
    for (let i = 0; i <= (this.maxXAxis - this.startYear) * this.months.length; i++) {
      // First entry is what you start with
      if (i === 0) {
        let series = new Series(i, this.totalAccountValue);
        noActionData.series.push(series);
        continue;
      }

      let val = noActionData.series[i - 1].value * (1 + (this.standardReturnRate / this.months.length));
      val = val >= 0 ? val : 0;

      let series = new Series(i, val);

      noActionData.series.push(series);
    }
    this.data.push(noActionData);
  }

}
