import { Component, OnInit } from '@angular/core';
import { PortalService } from './portal.service';
import { App } from '../../models/app';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert2';

declare const $: any;
declare const WOW: any;


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: [
    './portal.component.scss',
    '../../../assets/css/style.css',
    '../../../assets/css/animate.min.css'
  ],
  providers: [PortalService]
})
export class PortalComponent implements OnInit {

  public loading: boolean;
  public loading_system: boolean;
  public apps: Array<App>;
  public available: boolean;
  public showSystem: boolean;
  public app: App;


  constructor(private service: PortalService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.loading_system = false;
    this.available = true;
    this.showSystem = false;
    this.apps = [];
    this.app = new App(-1, '', '', '', '', -1);

    this.service.getAllApps().subscribe(result => {
      if (result.response.sucessfull) {


        this.apps = result.data.listUrlKiosco;
        this.available = true;
        this.loading = false;

        setTimeout(() => {
          this.pluginEffect();
        }, 50);


      } else {

        swal('Oops...', result.response.message, 'error');
        this.available = false;
        this.loading = false;

      }

    }, error => {
      swal('Oops...', 'Ocurrió un error en el servicio!', 'error');
      this.available = false;
      this.loading = false;
    });

  }



  startApp(): void {
    $('.section-about').fadeOut();
    $('.section-labs').fadeIn();
  }

  showInicio() {
    $('.section-labs').fadeOut();
    setTimeout(() => {
      $('.section-about').fadeIn();
    }, 900);
  }

  pluginEffect(): void {
    setTimeout(() => {
      $('.start_contenido,.start_contenido_nav').show();
      new WOW().init();
    }, 1000);
  }

  goSystem(app_selected: App): void {
    this.app = app_selected;
    this.showSystem = true;
    setTimeout(() => {
      let heightsize = $(window).height();

      $('.ajuste_alto').height(heightsize);
    }, 1000);

  }

  volverApps(): void {

    /* 
    * Configuración del modal confirma salir
    */
    swal({
      title: '<span style="color: #DD6B55"> ¿Está seguro de que quiere salir de ' + this.app.nombre + ' ? </span>',
      html: '<span style="color: #DD6B55">Si inicio sesión verifique que su cuenta este cerrada</span>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      cancelButtonColor: '#DD6B55 ',

      cancelButtonText: 'Verificar',
      confirmButtonText: 'Salir ahora',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {

        this.showSystem = false;
        this.loading_system = false;

        setTimeout(() => {
          this.startApp();
          $('.start_contenido_nav').show();
        }, 50);
        /*
        * Si cancela accion
        */
      } else if (result.dismiss === swal.DismissReason.cancel) {

      }
    })

  }

  loadingSystem(): void {
    setTimeout(()=>{
      this.loading_system = this.loading_system? false : true;
    },100);
  }

}
