import { Component, OnInit } from '@angular/core';
import { MenuAppWebService } from './menu-app-web.service';
import { App } from '../../models/app';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import swal from 'sweetalert2';
import { deleteItemArray } from '../../utils';

@Component({
  selector: 'app-menu-app-web',
  templateUrl: './menu-app-web.component.html',
  styleUrls: ['./menu-app-web.component.scss'],
  providers: [MenuAppWebService]
})
export class MenuAppWebComponent implements OnInit {

  public loading: boolean;
  public texto_search: string;
  public apps: Array<App>;

  constructor(private service: MenuAppWebService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.apps = [];
    this.texto_search = "";
    if (this.auth.getIdUsuario() != null) {
      this.service.getAllUrlKiosco(this.auth.getIdUsuario()).subscribe(result => {

        if (result.response.sucessfull) {
          this.apps = result.data.listUrlKiosco;
          this.loading = false;
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

  eliminarApp(ev, app: App) {
    ev.preventDefault();

      /* 
       * Configuración del modal de confirmación
       */
      swal({
        title: '<span style="color: #303f9f "> ¿ Eliminar '+ app.nombre + '?  </span>',
        type: 'question',
        html: '<p style="color: #303f9f "><b>La aplicación web será eliminada completamente del sistema </b>',
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

              this.service.deleteUrlKiosco(this.auth.getIdUsuario(), app.id_url_kiosko).subscribe(result => {
                if (result.response.sucessfull) {
                  deleteItemArray(this.apps, app.id_url_kiosko , 'id_url_kiosko');
                  swal('Elimanado!', 'Aplicación eliminada', 'success')
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
          
        }
      })

  }

}
