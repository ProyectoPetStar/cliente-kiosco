import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../models/imagen';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isValidId, getCatalogoEstados, notify, noWhitespaceValidator } from '../../utils';
import { MenuBackgroundImageService } from './menu-background-image.service';
import swal from 'sweetalert2';


declare const $: any;
declare const moment: any;
@Component({
  selector: 'app-menu-background-image',
  templateUrl: './menu-background-image.component.html',
  styleUrls: ['./menu-background-image.component.scss'],
  providers: [MenuBackgroundImageService]
})
export class MenuBackgroundImageComponent implements OnInit {

  public imagen: Imagen;
  public loading: boolean;
  public ago: string;

  constructor(
    private service: MenuBackgroundImageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    //this.loading = true;

    this.ago = moment("20120620", "YYYYMMDD").fromNow();
    this.imagen = new Imagen(-1, '', '', '', -1, '');



    setTimeout(() => {

      $(".zoom").hover(function () {

        $(this).addClass('transition');
      }, function () {

        $(this).removeClass('transition');
      });

      $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
      });



    }, 900);
  }

  protector(): void {

    /* 
* Configuración del modal de confirmación
*/
    swal({
      title: '<span style="color: #303f9f ">¿ Utilizar como protector de pantalla ?</span>',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#303f9f',
      cancelButtonColor: '#9fa8da ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
      * Si acepta
      */
      if (result.value) {



        /*
        * Si cancela accion
        */
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // this.disabledBtn = false;
      }
    })

  }

}

