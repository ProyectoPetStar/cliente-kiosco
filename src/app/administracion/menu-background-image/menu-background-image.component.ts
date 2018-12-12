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

  public imagenes: Array<Imagen>;
  public loading: boolean;
  public ago: string;
  public texto_search: string;
  public wallpaper: Imagen;

  constructor(
    private service: MenuBackgroundImageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.loading = true;
    this.imagenes = [];
    this.texto_search = "";


    if (this.auth.getIdUsuario() != null) {
      this.service.getAllImagen(this.auth.getIdUsuario()).subscribe(result => {
        if (result.response.sucessfull) {
          this.imagenes = result.data.listImagen;

          let seleccionada = this.imagenes.filter(el => el.seleccion_imagen == 1);

          if(seleccionada.length == 0){
            // id_imagen igual a uno es la imagen por default
            this.wallpaper = this.imagenes.filter(el => el.id_imagen == 1)[0];
          }else{
            this.wallpaper = seleccionada[0];
          }
          this.ago = moment(this.wallpaper.fecha_modifica_registro_string, "DD/MM/YYYY HH:mm").fromNow();

          this.loading = false;

          setTimeout(() => {
            this.loadPlugins();
          }, 900);

        } else {
          swal('Oops...', result.response.message, 'error')
          this.loading = false;
        }
      }, error => {
        swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
        this.loading = false;
      }
      );
    } else {
      swal('Información', 'Inicie sesión de nuevo!', 'info')
    }

  }

  loadPlugins(): void {

    $(".zoom").hover(function () {

      $(this).addClass('transition');
    }, function () {

      $(this).removeClass('transition');
    });

    $('[data-fancybox="gallery"]').fancybox({
      // Options will go here
    });


  }

  select_wallpaper(imagen: Imagen): void {
    /* 
     * Configuración del modal de confirmación
     */
    swal({
      title: '<span style="color: #156ab1 ">¿ Utilizar como protector de pantalla ?</span>',
      html: '<p style="color: #156ab1 "> Imagen : ' + imagen.nombre + '<b> </b></p>',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#156ab1',
      cancelButtonColor: '#8FB6D6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
      * Si acepta
      */
      if (result.value) {

        this.service.seleccionImagen(this.auth.getIdUsuario(), imagen.id_imagen).subscribe(result => {
          if (result.response.sucessfull) {
            this.ago = moment(result.response.message, "DD/MM/YYYY HH:mm").fromNow();
            this.wallpaper = imagen;
            swal('Actualizado!', 'Cambió el fondo de pantalla', 'success')
          } else {
            swal('Oops...', result.response.message, 'error')
          }
        }, error => {
          swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
        });


        /*
        * Si cancela accion
        */
      } else if (result.dismiss === swal.DismissReason.cancel) {
        // this.disabledBtn = false;
      }
    })

  }

}

