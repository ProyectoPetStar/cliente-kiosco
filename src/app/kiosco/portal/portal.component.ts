import { Component, OnInit } from '@angular/core';
import { PortalService } from './portal.service';
import { SOCKET_WS, API_IP } from '../../constants';
import { App } from '../../models/app';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../models/message';
import swal from 'sweetalert2';
import { Idle } from 'idlejs/dist';




declare const $: any;
declare const WOW: any;
declare const window: any;


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
  public mensaje: Message;

  /*
   * Abre socket de comunicación
   */
  public privateIp: string;
  public publicIP: string;
  public ws_kiosco: any;
  public idle: any;

  constructor(private service: PortalService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.loading_system = false;
    this.available = true;
    this.showSystem = false;
    this.apps = [];
    this.privateIp = "";
    this.publicIP = "";
    this.app = new App(-1, '', '', '', '', -1);
    this.mensaje = new Message('connect_kiosco', 'connect');


    this.service.getAllApps().subscribe(result => {

      if (result.response.sucessfull) {
        this.apps = result.data.listUrlKiosco;
        this.privateIp = result.data.privateIp;
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

      /*
        * Obtiene IP Publica del kiosco
        */
      $.ajax({
        type: 'GET',
        url: API_IP,
        dataType: 'json',
        success: (data) => {
          // Activa el socket
          this.publicIP = data.ip;
          this.ws_kiosco = new WebSocket(SOCKET_WS + '/KIOSCO?publicIp=' + this.publicIP + '&privateIp=' + this.privateIp);

          setTimeout(() => {
            this.ws_kiosco.send(JSON.stringify(this.mensaje));
          }, 500);
        }
      });
      /*
       * Fin IP Publica del kiosco
       */

      /*
       * Configuracion del protector de pantalla
       */   

      this.idle = new Idle()
        .whenNotInteractive()
        .within(1)
        .do(() => {
          $.blockUI({
            fadeIn: 1000,
            message: $('#wallpaper'),
            css: {
              border: 'none',
              //opacity: .9, 
              top: '1px',
              left: '1px',
              width: $(window).width() + 'px',
              height: $(window).height() + 'px'
            }
          });
        })
        .start();
        /*
         * Fin configuración del protector de pantalla
         */ 

    }, 1000);
  }

  goSystem(app_selected: App): void {

    $.blockUI({
      message: '<h3><img src="assets/img/loader_icon_kiosco.gif" /> Cargando contenido ...</h3>',
      css: {
        border: 'none',
        padding: '15px',
        backgroundColor: '#000',
        '-webkit-border-radius': '10px',
        '-moz-border-radius': '10px',
        opacity: .5,
        color: '#fff'
      }
    });

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
    this.loading_system = this.loading_system ? false : true;

    if (!this.loading_system) {
      $.unblockUI();
    }
  }



  ngOnDestroy() {
    this.ws_kiosco.close();
  }

}
