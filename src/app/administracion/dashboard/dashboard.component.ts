import { Component, OnInit } from '@angular/core';
import { Highcharts } from 'highcharts';
import { configAppUsed } from './config.charts';

declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let data = [10,9];
      configAppUsed.series = [];
      configAppUsed.title.text = 'Aplicación mas utilizada';
      configAppUsed.subtitle.text = '';
      configAppUsed.xAxis.categories = ['SONARH', 'GO INTEGRO'];
      configAppUsed.series.push({ name: ' Cantidad de accesos ', data: data });
      $('#appUsed').highcharts(configAppUsed);

    }, 500);
  }

}
