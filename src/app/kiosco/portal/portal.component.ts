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
  public apps: Array<App>;
  public available: boolean;
  public control_image:boolean;


  constructor(private service: PortalService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.available = true;
    this.control_image = false;
    this.apps = [];

    this.service.getAllApps().subscribe(result => {
      if (result.response.sucessfull) {


        this.apps = result.data.listUrlKiosco;
        this.available = true;
        this.loading = false;

        setTimeout(()=>{
          this.pluginEffect();
        },50);


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



  startApp():void {
    $('.section-about').fadeOut();
    $('.section-labs').fadeIn();
  }

  pluginEffect():void{
    setTimeout(()=>{
      $('.start_contenido').show();
      this.control_image = true;
      new WOW().init();
    },1000);
  }

}
