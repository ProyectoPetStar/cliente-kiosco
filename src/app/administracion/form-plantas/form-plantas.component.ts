import { Component, OnInit } from '@angular/core';
import { Plantas } from '../../models/plantas';
import { FormPlantasService } from './form-plantas.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, getCatalogoEstados, notify, noWhitespaceValidator } from '../../utils';
import swal from 'sweetalert2';

declare const $: any;

@Component({
  selector: 'app-form-plantas',
  templateUrl: './form-plantas.component.html',
  styleUrls: ['./form-plantas.component.scss'],
  providers: [FormPlantasService]
})
export class FormPlantasComponent implements OnInit {

  public loading: boolean;
  public submitted: boolean;
  public planta: Plantas;
  public notValid: boolean;
  public formulario: FormGroup;
  public action: string;
  public estados: Array<any>;
  public aux_image: any;
  public image: any;

  constructor(
    private auth: AuthService,
    private service: FormPlantasService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.notValid = false;
    this.submitted = false;
    this.action = '';
    this.planta = new Plantas(-1, '', '', '', '', 'default.jpg', -1);
    this.estados = getCatalogoEstados();

    this.route.paramMap.subscribe(params => {

      let id_planta = parseInt(params.get('id'));

      if (isValidId(id_planta)) {

        this.service.getAllPlantaById(this.auth.getIdUsuario(), id_planta).subscribe(result => {

          if (result.response.sucessfull) {
            this.action = 'edit';
            this.planta = result.data.planta;
            this.notValid = false;
            this.loading = false;
            this.loadFormulario();

            /*
            * Get recupera image
            */
            this.service.getImage(this.auth.getIdUsuario(), this.planta.imagen).subscribe(result => {

              if (result.response.sucessfull) {
                this.image = 'data:image/jpg;base64,' + result.response.message;
              } else {
                notify('No se cargó imagen de planta', 'danger', 3000);
              }

            }, error => {
              notify('No se cargó imagen de planta', 'danger', 3000);
            });



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
      } else if (params.get('id') == 'Nueva-planta') {
        this.action = 'add';
        this.planta.activo = 1;
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
      nombre_planta: new FormControl({ value: this.planta.nombre_planta, disabled: false }, [Validators.required, noWhitespaceValidator]),
      estado_planta: new FormControl({ value: this.planta.estado_planta, disabled: false }, [Validators.required]),
      ip_publica: new FormControl({ value: this.planta.ip_publica, disabled: false }, [Validators.required, Validators.pattern(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)]),
      direccion_planta: new FormControl({ value: this.planta.direccion_planta, disabled: false }, [Validators.required])
    });
  }

  submit(ev, accion) {
    ev.preventDefault();
    let msj = '';

    if (accion == 'edit') {
      msj = '¿ Está seguro de actualizar los datos ?';
    } else if (accion == 'add') {
      msj = '¿ Está seguro de agregar planta ?';
    }

    this.submitted = true;

    if (this.formulario.valid) {

      /* 
     * Configuración del modal de confirmación
     */
      swal({
        title: '<span style="color: #156ab1 ">' + msj + '</span>',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#156ab1',
        cancelButtonColor: '#8FB6D6 ',
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
            this.service.updateCatalogoPlanta(this.auth.getIdUsuario(), this.planta).subscribe(result => {
              if (result.response.sucessfull) {
                swal('Actualizado!', 'Datos actualizados', 'success')
              } else {
                swal('Oops...', result.response.message, 'error')
              }
            }, error => {
              swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
            });
          } else if (accion == 'add') {

            this.service.insertCatalogoPlanta(this.auth.getIdUsuario(), this.planta).subscribe(result => {
              if (result.response.sucessfull) {
                $('#formPlanta')[0].reset();
                this.submitted = false;
                swal('Exito!', 'Planta registrada', 'success')
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
    this.planta.activo = (estatus == 0) ? 1 : 0;

    // if (this.planta.activo == 0) {
    //   swal('Advertencia', 'Los kioscos instalados en esta planta serán desactivados', 'warning');
    // }

  }

  seleccionaArchivo(evt): void {
    evt.preventDefault();
    //Si existe archivo cargado
    if (evt.target.files.length > 0) {
      let file = evt.target.files[0]; // FileList object
      let size = evt.target.files[0].size;

      if (((size / 1024) / 1024) <= 1.3) {

        let reader = new FileReader();

        reader.readAsDataURL(file);

        //Se leyó correctamente el file
        reader.onload = () => {

          this.aux_image = reader.result.split(',')[1];
          this.image = 'data:image/jpg;base64,' + new String(this.aux_image);
        }

        //Ocurrio un error al leer file
        reader.onerror = (error) => {
          this.aux_image = '';
        };


      } else {
        swal('Oops...', 'La imágen es demasiado grande!', 'error')
      }

    }

  }

  uploadImage(): void {

    this.service.uploadImage(this.auth.getIdUsuario(), encodeURIComponent(this.aux_image), 'planta', this.planta.id_planta).subscribe(result => {
      if (result.response.sucessfull) {
        this.aux_image = '';
        swal('Imagen actualizada!', 'Se actualizó imagen de la planta', 'success')
      } else {
        swal('Oops...', result.response.message, 'error')
      }
    }, error => {
      swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
    });

  }



}
