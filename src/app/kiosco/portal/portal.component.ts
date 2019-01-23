import { Component, OnInit } from '@angular/core';
import { PortalService } from './portal.service';
import { SOCKET_WS, API_IP } from '../../constants';
import { App } from '../../models/app';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../models/message';
import swal from 'sweetalert2';
import { Idle, NotIdle } from 'idlejs/dist';
import {
  ANIMATION_BACKGROUND_WELCOME,
  ANIMATION_BACKGROUND_APP,
  ANIMATIONS_WELCOME1,
  ANIMATIONS_BOTELLIN,
  ANIMATION_COLABORADOR,
  ANIMATION_CAROUSEL,
  AnimationPlayer,
  AnimationBuilder
} from './efects.animaciones';


declare const $: any;
declare const window: any;


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: [
    './portal.component.scss',
  ],
  providers: [PortalService],
  animations: [
    ANIMATION_BACKGROUND_WELCOME,
    ANIMATION_BACKGROUND_APP,
    ANIMATIONS_WELCOME1,
    ANIMATIONS_BOTELLIN,
    ANIMATION_COLABORADOR,
    ANIMATION_CAROUSEL
  ]
})
export class PortalComponent implements OnInit {

  public loading: boolean;
  public loading_system: boolean;
  public apps: Array<App>;
  public available: boolean;
  public showSystem: boolean;
  public app: App;
  public mensaje: Message;
  public wallpaper_active: boolean;
  public welcome_status: string;
  public app_status: string;
  public apps_auxiliar: Array<any>;

  /*
   * Abre socket de comunicación
   */
  public privateIp: string;
  public publicIP: string;
  public wallpaper: string;
  public ws_kiosco: any;
  public ws_kiosco_using: any;
  public idle: any;
  public idle_quit: any;
  public temporizador: any;

  constructor(private service: PortalService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.loading_system = false;
    this.available = true;
    this.showSystem = false;
    this.apps_auxiliar = [];
    this.apps = [];
    this.privateIp = "127.0.0.1";
    this.publicIP = "";
    this.wallpaper = "";
    this.app = new App(-1, '', '', '', '', -1);
    this.mensaje = new Message('connect_kiosco', 'connect');
    this.wallpaper_active = false;
    this.welcome_status = 'inactive';
    this.app_status = 'inactive';

    this.getIpPrivateJs();

    setTimeout(()=>{
      this.service.getStartKiosco().subscribe(result => {

        if (result.response.sucessfull) {       
          this.wallpaper = result.data.wallpaper;
          this.loading = false;
          setTimeout(() => {
            this.pluginEffect();
            this.welcome_status = 'active';
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

    }, 1000)

  }

  getIpPrivateJs(){
    // Codigo para obtener la ip privada del cliente
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    let pc: any = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description

    pc.onicecandidate =  (ice) => {
      //listen for candidate events
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      this.privateIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      pc.onicecandidate = noop;
    };
    // Fin de codigo para obtener ip privada
  }



  startApp(): void {
    this.apps_auxiliar = [];

    this.service.getAllApps().subscribe(result => {

      if (result.response.sucessfull) {
        this.apps = result.data.listUrlKiosco;
        this.apps = this.apps.filter(el => el.activo == 1);
        this.wallpaper = result.data.wallpaper;

        let cantidad_diapositivas = parseInt("" + this.apps.length / 2);


        if ((this.apps.length % 2) != 0) {
          cantidad_diapositivas += 1;
        }

        for (let i = 0; i < this.apps.length; i += 2) {
          this.apps_auxiliar.push(this.apps.slice(i, i + 2));
        }





        setTimeout(() => {
          $('.section-welcome').fadeOut();
          this.welcome_status = 'inactive';
          $('.section-apps').fadeIn();
          this.app_status = 'active';
          $('#contenedor_apps').carousel('pause');

        }, 300);

      } else {
        swal('Oops...', result.response.message, 'error');
      }

    }, error => {
      swal('Oops...', 'Ocurrió un error en el servicio!', 'error');
    });

  }

  showInicio() {
    $('.section-apps').fadeOut();
    this.app_status = 'inactive';
    setTimeout(() => {
      $('#contenedor_apps').carousel(0);
      $('.section-welcome').fadeIn();
      this.welcome_status = 'active';
    }, 500);
  }

  pluginEffect(): void {
    setTimeout(() => {


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
        .within(60, 1000)
        .do(() => {


          if (swal.isVisible()) {
            swal.close();
          }

          setTimeout(() => {

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

            this.wallpaper_active = true;
            this.welcome_status = 'inactive';
            this.app_status = 'inactive';

            clearTimeout(this.temporizador);

            /*
            *Resetea vista
            */

            setTimeout(() => {
              this.showSystem = false;
              this.app = new App(-1, '', '', '', '', -1);
              $('.section-welcome').fadeOut();
              $('.section-apps').fadeOut();
              setTimeout(() => {
                $('#contenedor_apps').carousel(0);
              }, 800)
            }, 300);

            if (this.ws_kiosco_using != undefined && this.ws_kiosco_using.readyState === this.ws_kiosco_using.OPEN) {
              this.ws_kiosco_using.close();
            }

          }, 800)


        })
        .start();
      /*
       * Fin configuración del protector de pantalla
       */

      this.idle_quit = new NotIdle()
        .whenInteractive()
        .within(1, 1000)
        .do(() => {
          if (this.wallpaper_active) {
            $.unblockUI();
            this.wallpaper_active = false;
            setTimeout(() => {
              $('.section-welcome').fadeIn();
              this.welcome_status = 'active';
            }, 300);
          }
        })
        .start();

    }, 1000);
  }

  goSystem(app_selected: App): void {

    $.blockUI({
      message: '<h5><img src="assets/img/loader_icon_kiosco.gif" style="padding-right:15px; padding-top: 15px;"/> Cargando contenido ...</h5>',
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

    this.welcome_status = 'inactive';
    this.app_status = 'inactive';

    setTimeout(() => {
      let heightsize = $(window).height();
      $('.ajuste_alto').height(heightsize);


      this.temporizador = setTimeout(() => {
        //Abre socket para notificar al administrador que el kiosco esta en uso
        this.ws_kiosco_using = new WebSocket(SOCKET_WS + '/KIOSCO_USING_NOW');
        setTimeout(() => {
          this.ws_kiosco_using.send(JSON.stringify(new Message('using_kiosco_now', 'using')));
        }, 100);
        //Registra acceso en la base de datos
        this.service.registrarAcceso(this.privateIp, this.publicIP, this.app.id_url_kiosko).subscribe(result => {

        }, error => { });


      }, 63000);

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
        clearTimeout(this.temporizador);

        setTimeout(() => {
          this.startApp();
          this.ws_kiosco_using.close();

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
    this.ws_kiosco_using.close();
  }

}
