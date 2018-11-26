import { Component, OnInit } from '@angular/core';
import { FormAppWebService } from './form-app-web.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, notify, noWhitespaceValidator } from '../../utils';
import { App } from '../../models/app';
import swal from 'sweetalert2';


declare const $: any;

@Component({
  selector: 'app-form-app-web',
  templateUrl: './form-app-web.component.html',
  styleUrls: ['./form-app-web.component.scss'],
  providers: [  FormAppWebService ]
})
export class FormAppWebComponent implements OnInit {

  public loading: boolean;
  public submitted: boolean;
  public app: App;
  public notValid: boolean;
  public formulario: FormGroup;
  public action: string;


  constructor(
    private auth: AuthService,
    private service: FormAppWebService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.notValid = false;
    this.submitted = false;
    this.action = '';
    this.app = new App(-1,'','','','',-1);

    this.route.paramMap.subscribe(params => {

      let id_url_kiosco = parseInt(params.get('id'));

      if (isValidId(id_url_kiosco)) {

        this.service.getUrlKioscoById(this.auth.getIdUsuario(), id_url_kiosco).subscribe(result => {

          if (result.response.sucessfull) {
            this.action = 'edit';
            this.app = result.data.urlKiosco;
            this.notValid = false;
            this.loading = false;

            this.loadFormulario();



          } else {
            swal('Oops...', result.response.message, 'error')
            this.notValid = true;
            this.loading = false;
          }
        }, error => {

          swal('Oops...', 'Ocurrió un error en el servicio!', 'error')
          this.notValid = true;
          this.loading = false;

        });
        // 'Nueva-planta' es el texto que se recibe como parametro desde la url
      } else if (params.get('id') == 'Nueva-Aplicación') {
        this.action = 'add';
        this.app.activo = 1;
        this.notValid = false;
        this.loading = false;
        this.loadFormulario();

      } else {
        this.notValid = true;
        this.loading = false;
      }

    });

  }


  loadFormulario(): void {
    this.formulario = this.fb.group({
      nombre: new FormControl({ value: this.app.nombre, disabled: false }, [Validators.required, noWhitespaceValidator]),
      url: new FormControl({ value: this.app.url, disabled: false }, [Validators.required, Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]),
      descripcion: new FormControl({ value: this.app.descripcion, disabled: false }, [Validators.required, noWhitespaceValidator])
    });
  }

  submit(ev, accion) {
    ev.preventDefault();
    let msj = '';

    if (accion == 'edit') {
      msj = '¿ Está seguro de actualizar los datos ?';
    } else if (accion == 'add') {
      msj = '¿ Está seguro de agregar '+ this.app.nombre +' ?';
    }

    this.submitted = true;

    if (this.formulario.valid) {

      /* 
     * Configuración del modal de confirmación
     */
      swal({
        title: '<span style="color: #303f9f ">' + msj + '</span>',
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

          if (accion == 'edit') {
            this.service.updateUrlKiosco(this.auth.getIdUsuario(), this.app).subscribe(result => {
              if (result.response.sucessfull) {
                swal('Actualizado!', 'Datos actualizados', 'success')
              } else {
                swal('Oops...', result.response.message, 'error')
              }
            }, error => {
              swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
            });
          } else if (accion == 'add') {

            this.service.insertUrlKioscos(this.auth.getIdUsuario(), this.app).subscribe(result => {
              if (result.response.sucessfull) {
                $('#formApp')[0].reset();
                this.submitted = false;
                swal('Exito!', 'Aplicación Web registrada', 'success')
              } else {
                swal('Oops...', result.response.message, 'error')
              }
            }, error => {
              swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
            });

          }

          /*
          * Si cancela accion
          */
        } else if (result.dismiss === swal.DismissReason.cancel) {
          // this.disabledBtn = false;
        }
      })
    } else {
      notify('Verifique los datos capturados!', 'danger', 2800);
    }

  }

  changeStatus(estatus: number) {
    this.app.activo = (estatus == 0) ? 1 : 0;

    if (this.app.activo == 0) {
      swal('Advertencia', 'La aplicación no será mostrada en los kioscos', 'warning');
    }

  }

}
