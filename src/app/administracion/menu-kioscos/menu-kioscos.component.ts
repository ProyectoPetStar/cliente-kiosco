import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MenuKioscosService } from './menu-kioscos.service';
import { Kiosco } from '../../models/kiosco';
import { getTablaUtf8 } from '../../utils';
import swal from 'sweetalert2';
import { SOCKET_WS } from '../../constants';
import { Message } from '../../models/message';

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
  public mensaje: Message;
  public ws_admin = new WebSocket(SOCKET_WS + '/ADMIN');
  public kioscos_online: Array<any>;

  constructor(
    private service: MenuKioscosService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.kioscos = [];
    this.kioscos_online = [];
    this.texto_search = "";
    this.mensaje = new Message('connect_kiosco', 'info');

    if (this.auth.getIdUsuario() != null) {
      this.service.getAllKioscos(this.auth.getIdUsuario()).subscribe(result => {

        if (result.response.sucessfull) {
          this.kioscos = result.data.listKiosco;
          this.ws_admin.send(JSON.stringify(this.mensaje));
          this.ws_admin.onmessage = (response) => {
            this.kioscos_online = JSON.parse(response.data)[1];
            this.checkStatusKiosco(this.kioscos_online);
          };
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


  exportarExcel(evt: Event): void {
    evt.preventDefault();

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

  checkStatusKiosco(kioscos_online: Array<any>): void {


    this.kioscos.map((kiosco_registrado) => {
      let ip_publica = kiosco_registrado.planta.ip_publica;
      let ip_privada = kiosco_registrado.ip_privada;

      let element = kioscos_online.filter(kiosco_online => (kiosco_online.ip_publica == ip_publica && kiosco_online.ip_privada == ip_privada));

      if (element.length > 0) {
        kiosco_registrado.online = true;
      } else {
        kiosco_registrado.online = false;
      }

    });


  }

 

  ngOnDestroy() {
    this.ws_admin.close();
  }

}
