import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Highcharts } from 'highcharts';
import { configAppUsed, configByTurn, configAppUsedGral } from './config.charts';
import { Message } from '../../models/message';
import { Plantas } from '../../models/plantas';
import { Kiosco } from '../../models/kiosco';
import { SOCKET_WS } from '../../constants';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert2';


declare const $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  public mensaje: Message;
  public kioscos_now: number;
  public app_more_used: string;
  public planta_more_access: string;
  public ws_admin = new WebSocket(SOCKET_WS + '/ADMIN');
  public loading: boolean;
  public plantas: Array<Plantas>;
  public kioscos: Array<Kiosco>;
  public submitted: boolean;
  public formulario: FormGroup;
  public paramsFind: any;
  public dataGral: Array<any>;


  constructor(
    private auth: AuthService,
    private service: DashboardService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading =  true;
    this.mensaje = new Message('info_dashboard', 'info');
    this.plantas = [];
    this.kioscos = [];
    this.dataGral = [];
    this.kioscos_now = 0;
    this.app_more_used = '';
    this.planta_more_access = '';
    this.paramsFind = {
      id_planta: -1,
      id_kiosco: -1,
      fecha: ''
    };

    this.service.conteoKiosco(this.auth.getIdUsuario()).subscribe(result => {

      if (result.response.sucessfull) {
        this.app_more_used = result.data.aplicacion.aplicacion;
        this.planta_more_access = result.data.planta.planta;
        this.plantas = result.data.listPlanta;
        this.kioscos = result.data.listKiosco;
        this.loading = false;
        this.loadFormulario();
        this.buildChartGral(result.data.listReportes);

      } else {

        this.loading = false;
      }
    }, error => {

      swal('Oops...', 'Ocurrió un error en el servicio!', 'error')
      this.loading = false;

    });

    // setTimeout(() => {
    //   let data = [10, 9];
    //   configAppUsed.series = [];
    //   configAppUsed.title.text = 'Conexiones por aplicación';
    //   configAppUsed.subtitle.text = 'Kiosco PC-TOLUCA123';
    //   configAppUsed.xAxis.categories = ['SONARH', 'GO INTEGRO'];
    //   configAppUsed.series.push({ name: ' Total de conexiones ', data: data });
    //   $('#appUsed').highcharts(configAppUsed);

    //   let data2 = [200, 90];
    //   configAppUsedGral.series = [];
    //   configAppUsedGral.title.text = 'Aplicación mas utilizada';
    //   configAppUsedGral.subtitle.text = '';
    //   configAppUsedGral.xAxis.categories = ['SONARH', 'GO INTEGRO'];
    //   configAppUsedGral.series.push({ name: ' Cantidad de accesos ', data: data2 });
    //   $('#appUsedGral').highcharts(configAppUsedGral);

    //   let data1 = [3, 6, 10];
    //   configByTurn.series = [];
    //   configByTurn.title.text = 'Conexiones por turno';
    //   configByTurn.subtitle.text = 'Kiosco PC-TOLUCA123';
    //   configByTurn.xAxis.categories = ['TURNO 1', 'TURNO 2', 'TURNO 3'];
    //   configByTurn.series.push({ name: 'Conexiones ', data: data1 });
    //   $('#byTurn').highcharts(configByTurn);


    //   this.ws_admin.send(JSON.stringify(this.mensaje));


    //   this.ws_admin.onmessage = (response) => {
    //     this.kioscos_now = JSON.parse(response.data)[0];
    //   };

    // }, 500);
  }

  buildChartGral(accesos: Array<any>): void {
    setTimeout(() => {
      let datos = accesos.map(el => el.conteo);
      configAppUsedGral.series = [];
      configAppUsedGral.title.text = 'Aplicación mas utilizada';
      configAppUsedGral.subtitle.text = '';
      configAppUsedGral.xAxis.categories = accesos.map(el => el.nombre);
      configAppUsedGral.series.push({ name: ' Cantidad de accesos ', data: datos });
      $('#appUsedGral').highcharts(configAppUsedGral);
    }, 500);
  }

  loadFormulario(): void {
    this.formulario = this.fb.group({
      id_planta: new FormControl({ value: this.paramsFind.id_planta, disabled: false }, [Validators.pattern(/^\d+$/)]),
      id_kiosco: new FormControl({ value: this.paramsFind.id_kiosco, disabled: false }, [Validators.pattern(/^\d+$/)]),
      fecha: new FormControl({ value: this.paramsFind.fecha, disabled: false }, [Validators.required])
    });
  }

  submit(ev) {
    ev.preventDefault();
    alert('CONSULTA DATOS')
  }

  ngOnDestroy() {
    this.ws_admin.close();
  }

}
