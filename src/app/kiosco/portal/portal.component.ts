import { Component, OnInit } from '@angular/core';
import { PortalService } from './portal.service';
import { SOCKET_WS, API_IP, URL_IMAGES } from '../../constants';
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
  public wallpapers: Array<any>;
  public ws_kiosco: any;
  public ws_kiosco_using: any;
  public temporizador: any;

  public time: number;


  public inactivityOnSystem: boolean;
  public backBtn: boolean;
  public status_btn_entrar: boolean;
  public tmp_out_of_service: any;
  public interval_change_wallpaper: any;
  public index_show_wallpaper: number;
  public collection_animation: Array<string>;
  public img_show: string;
  public URL_WALLPAPERS: string;

  constructor(private service: PortalService,
  private auth: AuthService) {}

  ngOnInit() {
    clearInterval(this.tmp_out_of_service);
    clearInterval(this.interval_change_wallpaper);
    this.loading = true;
    this.URL_WALLPAPERS = URL_IMAGES + '/protectorPantalla/';
    this.loading_system = false;
    this.available = true;
    this.apps_auxiliar = [];
    this.apps = [];
    this.privateIp = "127.0.0.1";
    this.publicIP = "";
    this.wallpapers = [];
    this.app = new App(-1, '', '', '', '', -1);
    this.mensaje = new Message('connect_kiosco', 'connect');
    this.wallpaper_active = false;
    this.welcome_status = 'inactive';
    this.app_status = 'inactive';
    this.time = 30;
    this.inactivityOnSystem = false;
    this.backBtn = false;
    this.status_btn_entrar = false;
    this.index_show_wallpaper = 0;
    this.collection_animation = [
      "wallpaper-animate-opacity",
      "wallpaper-animate-zoom",
      "wallpaper-animate-left",
      "wallpaper-animate-bottom",
      "wallpaper-animate-top"
    ];



    this.getIpPrivateJs();

    setTimeout(() => {
      this.service.getStartKiosco().subscribe(result => {

        if (result.response.sucessfull) {
          this.wallpapers = result.data.listResultString;
          this.img_show = this.wallpapers[this.index_show_wallpaper].result;
          this.loading = false;
          setTimeout(() => {
            this.pluginEffect();
            this.welcome_status = 'active';
          }, 50);


        } else {

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
        this.wallpapers = result.data.wallpapers;
        this.img_show = this.wallpapers[this.index_show_wallpaper].result;

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

      $('.zone-activity').on("idle.idleTimer", (event, elem, obj) => {
        // function you want to fire when the user goes idle
        $('.zone-activity').idleTimer("destroy");
        this.idleActions();
        this.inactivityForWallpaper();

      });

      $('.zone-activity').on("active.idleTimer", (event, elem, obj, triggerevent) => {
        // function you want to fire when the user becomes active again
      });




      $('.zone-activity-wallpaper').on("idle.idleTimer", (event, elem, obj) => {
        // function you want to fire when the user goes idle
      });

      $('.zone-activity-wallpaper').on("active.idleTimer", (event, elem, obj, triggerevent) => {
        // function you want to fire when the user becomes active again
        $('.zone-activity-wallpaper').idleTimer("destroy");
        this.notIdleActions();
        this.inactivityForMenu();

        //reset presentacion wallpaper
        clearInterval(this.interval_change_wallpaper);
        setTimeout(() => {
          $('#wallpaper').removeClass("wallpaper-animate-opacity wallpaper-animate-zoom wallpaper-animate-left wallpaper-animate-bottom wallpaper-animate-top");
          this.index_show_wallpaper = 0;
        }, 2000);

      });



      $('.zone-activity-btn').on("idle.idleTimer", (event, elem, obj) => {
        // function you want to fire when the user goes idle
        $('.zone-activity-btn').idleTimer("destroy");
        this.idleActions();
        this.inactivityForWallpaper();

      });

      $('.zone-activity-btn').on("active.idleTimer", (event, elem, obj, triggerevent) => {
        // function you want to fire when the user becomes active again

      });

    }, 1000);
  }

  inactivityForWallpaper() {
    $('.zone-activity-wallpaper').idleTimer(20);

  }


  inactivityForMenu() {
    $('.zone-activity').idleTimer(this.time * 1000);
  }

  inactivityForApp() {
    $('.zone-activity-btn').idleTimer({
      timeout: this.time * 1000,
      events: 'mousedown touchstart'
    });





  }

  idleActions(): void {


    if (swal.isVisible()) {
      swal.close();
    }

    setTimeout(() => {
      //this.hiddenKeyBoard();
      $.blockUI({
        fadeIn: 1000,
        message: $('#wallpaper'),
        css: {
          border: 'none',
          //opacity: .9,
          backgroundColor: '#000',
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
      // clearTimeout(this.funcCountDown);

      /*
      *Resetea vista
      */



      setTimeout(() => {
        //this.showSystem = false;
        this.app = new App(-1, '', '', '', '', -1);
        $('.section-welcome').fadeOut();
        $('.section-apps').fadeOut();
        setTimeout(() => {
          $('#contenedor_apps').carousel(0);

          this.interval_change_wallpaper = setInterval(() => {
            $('#wallpaper').removeClass("wallpaper-animate-opacity wallpaper-animate-zoom wallpaper-animate-left wallpaper-animate-bottom wallpaper-animate-top");
            let num = Math.floor(Math.random() * (4 - 0 + 1)) + 0;
            let animation_active = this.collection_animation[num]
            setTimeout(() => {
              $('#wallpaper').addClass(animation_active);
            }, 50);

            if (this.index_show_wallpaper == (this.wallpapers.length - 1)) {
              this.index_show_wallpaper = 0;
            } else {
              this.index_show_wallpaper++;
            }


            this.img_show = this.wallpapers[this.index_show_wallpaper].result;

          }, 30000);

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


  goSystem(app_selected: App): void {
    

    this.app = app_selected;
    let windowsTab = window.open(this.app.url, '_blank');

    if (windowsTab) {
      //Browser has allowed it to be opened
      windowsTab.focus();
    } else {
      //Browser has blocked it
      alert('Tu navegador no permite abrir pestañas');
    }

 

    setTimeout(() => {
     
      this.temporizador = setTimeout(() => {
        //Abre socket para notificar al administrador que el kiosco esta en uso

        if ((this.ws_kiosco_using == undefined) || this.ws_kiosco_using && this.ws_kiosco_using.OPEN != 1) {
          this.ws_kiosco_using = new WebSocket(SOCKET_WS + '/KIOSCO_USING_NOW');
          setTimeout(() => {
            this.ws_kiosco_using.send(JSON.stringify(new Message('using_kiosco_now', 'using')));
          }, 3000);
        }


      }, 1000);

      //Registra acceso en la base de datos

      this.service.registrarAcceso(this.privateIp, this.publicIP, this.app.id_url_kiosko).subscribe(result => {

      }, error => { });

    

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
        this.backBtn = true;
     
        this.loading_system = false;
        this.inactivityOnSystem = false;
        clearTimeout(this.temporizador);
       

        setTimeout(() => {
          this.startApp();
          $('.zone-activity-btn').idleTimer("destroy");
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

  refreshKiosco() {
    window.location.reload();
  }



  ngOnDestroy() {
    this.ws_kiosco.close();
    this.ws_kiosco_using.close();
  }

}
