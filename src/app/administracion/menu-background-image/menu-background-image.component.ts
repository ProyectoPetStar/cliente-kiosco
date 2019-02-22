import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../models/imagen';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { isValidId, getCatalogoEstados, notify, noWhitespaceValidator, deleteItemArray } from '../../utils';
import { MenuBackgroundImageService } from './menu-background-image.service';
import { URL_IMAGES } from '../../constants';
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
  public URL_PROTECTOR: string;
  public wallpapers: Array<Imagen>;
  public secuencia: any;


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
    this.URL_PROTECTOR = URL_IMAGES + '/protectorPantalla/';
    this.wallpapers = [];
    this.secuencia = {};


    if (this.auth.getIdUsuario() != null) {
      this.service.getAllImagen(this.auth.getIdUsuario()).subscribe(result => {
        if (result.response.sucessfull) {
          this.imagenes = result.data.listImagen;

          this.wallpapers = this.imagenes.filter(el => el.seleccion_imagen == 1);
          if (this.wallpapers.length > 0) {
            this.wallpapers = this.wallpapers.sort((a, b) => {
              return a.posicion - b.posicion
            });
          } else {
            // id_imagen igual a uno es la imagen por default
            let imagen_default = this.imagenes.filter(el => el.id_imagen == 1)[0];
            this.wallpapers.push(imagen_default);

          }

          for (let i = 0; i <= this.wallpapers.length && (i + 1 < 5); i++) {
            this.secuencia[i + 1] = i + 1;
          }

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
      input: 'select',
      inputOptions: this.secuencia,
      inputPlaceholder: 'Seleccione posición',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#156ab1',
      cancelButtonColor: '#8FB6D6',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false,
      inputValidator: (value) => {

        return new Promise((resolve) => {

          if (value != '') {
            resolve();
            this.service.seleccionImagen(this.auth.getIdUsuario(), imagen.id_imagen, value).subscribe(result => {
              if (result.response.sucessfull) {
                //this.ago = moment(result.response.message, "DD/MM/YYYY HH:mm").fromNow();
                if (parseInt(value) > this.wallpapers.length) {
                  this.wallpapers.push(imagen);
                  imagen.seleccion_imagen = 1;
                } else {
                  this.wallpapers[parseInt(value) - 1] = imagen
                }
                
                imagen.posicion = parseInt(value);
                this.secuencia = {};
                for (let i = 0; i <= this.wallpapers.length && (i + 1 < 5); i++) {
                  this.secuencia[i + 1] = i + 1;
                }

                swal('Exito!', 'Se ha completado con exito', 'success');
              } else {
                swal('Oops...', result.response.message, 'error')
              }
            }, error => {
              swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
            });

          } else {
            resolve('Seleccione posición')
          }
        })
      }
    })

  }

  cambiarStatus(wallpaper: Imagen): void {
    this.service.cambiarStatus(this.auth.getIdUsuario(), wallpaper).subscribe(result => {
      if (result.response.sucessfull) {
        deleteItemArray(this.wallpapers,wallpaper.id_imagen,'id_imagen');
        
        this.wallpapers.map((el)=>{
           if(wallpaper.posicion < el.posicion){
              el.posicion = (el.posicion - 1);
           }
        });

        this.imagenes.filter(el =>{
          if(el.id_imagen == wallpaper.id_imagen){
             el.seleccion_imagen = 0;
             el.posicion = null;
          }
        });
        this.secuencia = {};
        for (let i = 0; i <= this.wallpapers.length && (i + 1 < 5); i++) {
          this.secuencia[i + 1] = i + 1;
        }
      } else {
        swal('Oops...', result.response.message, 'error')
      }
    }, error => {
      swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
    });
  }

}

