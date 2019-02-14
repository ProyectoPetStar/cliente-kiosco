import { Component, OnInit } from '@angular/core';
import { PortalService } from './portal.service';
import { SOCKET_WS, API_IP } from '../../constants';
import { App } from '../../models/app';
import { AuthService } from '../../auth/auth.service';
import { Message } from '../../models/message';
import swal from 'sweetalert2';
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
declare const moment: any;


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
  public temporizador: any;
  public countdown: string;
  public funcCountDown: any;

  public time: number;
  public duration: any;

  public inactivityOnSystem: boolean;
  public backBtn: boolean;
  public status_btn_entrar: boolean;
  public tmp_out_of_service: any;

  constructor(private service: PortalService,
    private auth: AuthService) { }

  ngOnInit() {
    clearInterval(this.tmp_out_of_service);
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
    this.countdown = '00:00';
    // this.time = 300;
    this.time = 30;
    this.inactivityOnSystem = false;
    this.backBtn = false;
    this.status_btn_entrar = false;



    this.hiddenKeyBoard();
    this.getIpPrivateJs();

    setTimeout(() => {
      this.service.getStartKiosco().subscribe(result => {

        if (result.response.sucessfull) {
          this.wallpaper = result.data.wallpaper;
          this.loading = false;
          setTimeout(() => {
            this.pluginEffect();
            this.welcome_status = 'active';
          }, 50);


        } else {

          // swal('Oops...', result.response.message, 'error');
          swal('Lo sentimos', 'Kiosco fuera de servicio!. Haga clic en el botón <b>Intentar acceder</b> para comprobar disponibilidad', 'error');
          this.available = false;
          this.loading = false;
          this.OutSideService();

        }

      }, error => {

        swal('Lo sentimos', 'Kiosco fuera de servicio!.  <br>Haga clic en el botón <u>Intentar acceder</u> para comprobar disponibilidad', 'error');
        this.available = false;
        this.loading = false;
        this.OutSideService();

      });

    }, 1000)

  }



  OutSideService(): void {
    this.tmp_out_of_service = setInterval(() => {
      window.location.reload();
    }, 600000);
  }

  getIpPrivateJs() {
    // Codigo para obtener la ip privada del cliente
    window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;   //compatibility for firefox and chrome
    let pc: any = new RTCPeerConnection({ iceServers: [] }), noop = function () { };
    pc.createDataChannel("");    //create a bogus data channel
    pc.createOffer(pc.setLocalDescription.bind(pc), noop);    // create offer and set local description

    pc.onicecandidate = (ice) => {
      //listen for candidate events
      if (!ice || !ice.candidate || !ice.candidate.candidate) return;
      this.privateIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
      pc.onicecandidate = noop;
    };
    // Fin de codigo para obtener ip privada
  }



  startApp(): void {
    this.status_btn_entrar = true;
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
          this.status_btn_entrar = false;

        }, 300);

      } else {
        swal('Oops...', result.response.message, 'error');
        this.status_btn_entrar = false;

      }

    }, error => {
      swal('Oops...', 'Ocurrió un error en el servicio!', 'error');
      this.status_btn_entrar = false;
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
          }, 5000);
        }
      });
      /*
       * Fin IP Publica del kiosco
       */


      this.inactivityForMenu();
      this.inactivityForImage();


    }, 1000);
  }


  inactivityForImage() {
    /*
    * Configuracion idle
    */
    $('.zone-activity-image').idle({
      //idle time in ms
      idle: this.time * 1000,
      //events that will trigger the idle resetter
      events: 'mousemove keydown mousedown touchstart',
      // executed after idle time
      onIdle: () => { },
      // executed after back from idleness
      onActive: () => {

        this.notIdleActions();

        if (this.inactivityOnSystem) {
          localStorage.clear();
          this.inactivityOnSystem = false;
          this.inactivityForMenu();
        } else {
          $('.zone-activity').trigger("mousedown");
        }

      },
      // set to false if you want to track only the first time
      keepTracking: true,
      startAtIdle: false,
      recurIdleCall: false
    });

    /*
     * Fin configuración idle
     */
  }


  inactivityForMenu() {
    /*
    * Configuracion idle
    */

    $('.zone-activity').idle({

      //idle time in ms
      idle: this.time * 1000,

      //events that will trigger the idle resetter
      events: 'mousemove keydown mousedown touchstart',

      // executed after idle time
      onIdle: () => {

        if (!this.showSystem && !this.backBtn) {

          this.idleActions();
        }

        if (this.backBtn) {
          this.backBtn = false;
        }
      },

      // executed after back from idleness
      onActive: () => {

        this.notIdleActions();
      },
      // set to false if you want to track only the first time
      keepTracking: true,
      startAtIdle: false,
      recurIdleCall: false

    });

    /*
     * Fin configuración idle
     */
  }

  inactivityForApp() {

    this.duration = moment.duration(this.time, 's');
    this.countdown = moment(this.duration.asMilliseconds()).format('mm:ss');



    this.funcCountDown = setInterval(() => {
      this.duration = moment.duration(this.duration.asMilliseconds() - 1000, 'milliseconds');
      //show how many hours, minutes and seconds are left 
      this.countdown = moment(this.duration.asMilliseconds()).format('mm:ss');
    }, 1000);

    /*
    * Configuracion idle
    */

    $('.zone-activity-btn').idle({

      //idle time in ms
      idle: this.time * 1000,

      //events that will trigger the idle resetter
      events: 'mousedown touchstart',

      // executed after idle time
      onIdle: () => {
        if (this.showSystem) {
          this.inactivityOnSystem = true;
          this.idleActions();
        }
      },

      // executed after back from idleness
      onActive: function () {
      },
      // set to false if you want to track only the first time
      keepTracking: true,
      startAtIdle: false,
      recurIdleCall: false

    });

    /*
     * Fin configuración idle
     */
  }

  idleActions(): void {

    if (swal.isVisible()) {
      swal.close();
    }

    setTimeout(() => {
      this.hiddenKeyBoard();

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
      clearTimeout(this.funcCountDown);

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
  }

  notIdleActions(): void {

    if (this.wallpaper_active) {
      $.unblockUI();
      this.wallpaper_active = false;
      setTimeout(() => {
        $('.section-welcome').fadeIn();
        this.welcome_status = 'active';
      }, 300);
    }
  }

  resetCountDown() {
    this.duration = moment.duration(this.time, 's');
    this.countdown = moment(this.duration.asMilliseconds()).format('mm:ss');
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
    this.backBtn = false;
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
        }, 5000);
        //Registra acceso en la base de datos
        this.service.registrarAcceso(this.privateIp, this.publicIP, this.app.id_url_kiosko).subscribe(result => {

        }, error => { });


      }, 63000);

    }, 1000);

  }

  volverApps(): void {

    this.hiddenKeyBoard();

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
        this.backBtn = true;
        this.showSystem = false;
        this.loading_system = false;
        this.inactivityOnSystem = false;
        clearTimeout(this.temporizador);
        clearTimeout(this.funcCountDown);

        setTimeout(() => {
          this.startApp();
          this.inactivityForMenu();

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
    if (this.getNavegador() == "Firefox") {
      $.unblockUI();
      this.inactivityForApp();
    } else {
      this.loading_system = this.loading_system ? false : true;
      if (!this.loading_system) {
        $.unblockUI();
        this.inactivityForApp();
      }
    }

  }

  showKeyBoard(): void {
    //Consulta servicio para activar teclado virtual
    $.ajax({
      type: 'GET',
      url: 'https://localhost:8080/keyboard-demo/show',
      dataType: 'json',
      success: (data) => {

      }
    });
  }

  hiddenKeyBoard(): void {
    //Consulta servicio para desactivar teclado virtual
    $.ajax({
      type: 'GET',
      url: 'https://localhost:8080/keyboard-demo/hidden',
      dataType: 'json',
      success: (data) => {

      }
    });

  }

  getNavegador(): string {
    let agente = window.navigator.userAgent;
    let navegadores = ["Chrome", "Firefox", "Safari", "Opera", "Trident", "MSIE", "Edge"];
    for (let i in navegadores) {
      if (agente.indexOf(navegadores[i]) != -1) {
        return navegadores[i];
      }
    }
  }

  refreshKiosco() {
    window.location.reload();
  }



  ngOnDestroy() {
    this.ws_kiosco.close();
    this.ws_kiosco_using.close();
  }

}
