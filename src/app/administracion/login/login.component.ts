import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { notify } from '../../utils';
import { CatalogoPerfil } from '../../models/catalogo-perfil';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})

export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public submitted: boolean;
  public usuario_acceso: string;
  public clave_acceso: string;
  public mensaje_error: string;
  public disabled: boolean;
  public usuario: User;

  constructor(private service: LoginService,
    private fb: FormBuilder,
    private router: Router) { }


  ngOnInit() {
    this.mensaje_error = "";
    this.submitted = false;
    this.disabled = false;
    this.usuario = new User(-1,'','','','','',-1,-1,'', new CatalogoPerfil(-1,'','',-1));
    this.usuario

    this.formLogin = this.fb.group({
      usuario_acceso: new FormControl(this.usuario_acceso, [Validators.required]),
      clave_acceso: new FormControl(this.clave_acceso, [Validators.required])
    });
  }

  login() {
    this.mensaje_error = "";
    this.submitted = true;

    if (this.formLogin.valid) {
      this.disabled = true;
      this.service.login(this.usuario_acceso, this.clave_acceso).subscribe(result => {

        if (result.response.sucessfull) {
          if (typeof (Storage) !== "undefined") {
            this.usuario = result.response.usuario;
            localStorage.setItem('token_kiosco', this.usuario.token);
            localStorage.setItem('datos_usuario_kiosco', JSON.stringify(this.usuario));
            this.router.navigate(['administracion/admin/Dashboard']);
          } else {
            notify('LocalStorage no soportado en este navegador!','danger',3000);
          }
        } else {
          notify(result.response.message,'danger',5000);
        }
        this.disabled = false;
      }, error =>{
        this.disabled = false;
        notify('Ocurrió  un error en el servicio!','danger',3000);
      });

    } else {
          notify('Verifique los datos capturados!','danger',2800);
    }

  }

  resetMensaje() {
    this.mensaje_error = "";
  }


}
