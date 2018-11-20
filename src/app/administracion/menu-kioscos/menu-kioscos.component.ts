import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MenuKioscosService } from './menu-kioscos.service';
import { Kiosco } from '../../models/kiosco';
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

}
