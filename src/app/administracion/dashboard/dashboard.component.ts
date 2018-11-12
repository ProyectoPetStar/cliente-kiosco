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

  foods: any[] = [
    {value: 'steak-0', viewValue: 'TOLUCA'},
    {value: 'pizza-1', viewValue: 'QUERETARO'},
    {value: 'tacos-2', viewValue: 'SONORA'}
  ];


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let data = [10,9];
      configAppUsed.series = [];
      configAppUsed.title.text = 'Cantidad de accesos por aplicación';
      configAppUsed.subtitle.text = '';
      configAppUsed.xAxis.categories = ['SONARH', 'GO INTEGRO'];
      configAppUsed.series.push({ name: ' Numero de accesos ', data: data });
      $('#appUsed').highcharts(configAppUsed);

    }, 500);
  }

}
