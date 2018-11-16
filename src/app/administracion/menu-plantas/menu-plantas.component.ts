import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuPlantasService } from './menu-plantas.service';
import { AuthService } from '../../auth/auth.service';
import { Plantas } from '../../models/plantas';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu-plantas',
  templateUrl: './menu-plantas.component.html',
  styleUrls: ['./menu-plantas.component.scss'],
  providers: [MenuPlantasService]
})
export class MenuPlantasComponent implements OnInit {

  public loading: boolean;
  public plantas: Array<Plantas>;

  constructor(
    private service: MenuPlantasService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.plantas = [];
    if (this.auth.getIdUsuario() != null) {
      this.service.getAllPlanta(this.auth.getIdUsuario()).subscribe(result => {

        if (result.response.sucessfull) {
          this.plantas = result.data.listPlanta;
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

}
