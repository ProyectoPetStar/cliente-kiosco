import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MenuKioscosService } from './menu-kioscos.service';
import { Kiosco } from '../../models/kiosco';
import { getTablaUtf8 } from '../../utils';
import swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-menu-kioscos',
  templateUrl: './menu-kioscos.component.html',
  styleUrls: ['./menu-kioscos.component.scss'],
  providers: [MenuKioscosService]
})
export class MenuKioscosComponent implements OnInit {

  public loading: boolean;
  public kioscos: Array<Kiosco>;
  public texto_search: string;

  constructor(
    private service: MenuKioscosService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.kioscos = [];
    this.texto_search = "";

    if (this.auth.getIdUsuario() != null) {
      this.service.getAllKioscos(this.auth.getIdUsuario()).subscribe(result => {

        if (result.response.sucessfull) {
          this.kioscos = result.data.listKiosco;
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

  getKioscosActivos(kioscos: Array<Kiosco>): number {
    return kioscos.filter(el => el.activo == 1).length;
  }


  exportarExcel(): void {

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';

    if (linkFile.download != undefined) {
      document.body.appendChild(linkFile);
      let tabla = getTablaUtf8('tabla_kioscos');

      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = 'Kioscos_registrados';

      linkFile.click();
      linkFile.remove();
    } else {

      let elem = $("#tabla_kioscos")[0].outerHTML;
      let blobObject = new Blob(["\ufeff", elem], { type: 'application/vnd.ms-excel' });
      window.navigator.msSaveBlob(blobObject, 'Kioscos_registrados.xls');
    }

  }

}
