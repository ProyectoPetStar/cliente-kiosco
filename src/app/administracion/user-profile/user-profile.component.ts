import { Component, OnInit } from '@angular/core';
import { UserProfileService } from './user-profile.service';
import { AuthService } from '../../auth/auth.service';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { CatalogoPerfil } from '../../models/catalogo-perfil';
import { notify } from '../../utils';

declare const $: any;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers: [ UserProfileService ]
})
export class UserProfileComponent implements OnInit {

  public usuario: User;
  public mensaje_error: string;
  public loading: boolean;

  constructor(
    private service: UserProfileService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) {}

  ngOnInit() {

    this.loading = true;
    this.usuario = new User(-1,'','','','','',-1,-1,'', new CatalogoPerfil(-1,'',-1));
   
      if (this.auth.getIdUsuario() != null) {
        this.service.getUsuarioById(this.auth.getIdUsuario()).subscribe(result => {
         
          if (result.response.sucessfull) {
            this.usuario = result.data.usuario;
            this.loading = false;
          } else {
            // Materialize.toast(result.response.message, 4000, 'red');
            notify(result.response.message,'danger',4000);
            this.loading = false;
          }
        }, error => {
          // Materialize.toast('Ocurrió  un error en el servicio!', 4000, 'red');
          notify('Ocurrió  un error en el servicio!','danger',4000);
          this.loading = false;
        }
        );
      }
  }

}
