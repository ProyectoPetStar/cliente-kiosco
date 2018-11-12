import { Component, OnInit } from '@angular/core';
import { Highcharts } from 'highcharts';
import { configAppUsed, configByTurn } from './config.charts';

declare const $: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  plantas: any[] = [
    { value: 'steak-0', viewValue: 'TOLUCA' },
    { value: 'pizza-1', viewValue: 'QUERETARO' },
    { value: 'tacos-2', viewValue: 'SONORA' }
  ];

  kioscos: any[] = [
    { value: 'steak-0', viewValue: 'PC-TOLUCA123' },
    { value: 'pizza-1', viewValue: 'PC-TOLUCA123A' },
    { value: 'tacos-2', viewValue: 'PC-QUERETARO' }
  ];


  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      let data = [10, 9];
      configAppUsed.series = [];
      configAppUsed.title.text = 'Conexiones por aplicación';
      configAppUsed.subtitle.text = 'Kiosco PC-TOLUCA123';
      configAppUsed.xAxis.categories = ['SONARH', 'GO INTEGRO'];
      configAppUsed.series.push({ name: ' Total de conexiones ', data: data });
      $('#appUsed').highcharts(configAppUsed);

      let data1 = [3, 6, 10];
      configByTurn.series = [];
      configByTurn.title.text = 'Conexiones por turno';
      configByTurn.subtitle.text = 'Kiosco PC-TOLUCA123';
      configByTurn.xAxis.categories = ['TURNO 1', 'TURNO 2', 'TURNO 3'];
      configByTurn.series.push({ name: 'Conexiones ', data: data1 });
      $('#byTurn').highcharts(configByTurn);

    }, 500);
  }

}
