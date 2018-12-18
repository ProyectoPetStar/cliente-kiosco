import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, noWhitespaceValidator, notify, getFechaActual } from '../../utils';
import { FormBackgroundImageService } from './form-background-image.service';
import { Imagen } from '../../models/imagen';
import swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-form-background-image',
  templateUrl: './form-background-image.component.html',
  styleUrls: ['./form-background-image.component.scss'],
  providers: [FormBackgroundImageService]
})
export class FormBackgroundImageComponent implements OnInit {

  public loading: boolean;
  public notValid: boolean;
  public action: string;
  public imagen: Imagen;
  public submitted: boolean;
  public formulario: FormGroup;
  public img_selected: string;
  public file_selected: any;
  public disabled_change_img: boolean;

  constructor(
    private auth: AuthService,
    private service: FormBackgroundImageService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.loading = true;
    this.submitted = false;
    this.action = '';
    this.imagen = new Imagen(-1, '', '', '', -1, '');
    this.disabled_change_img = true;

    this.route.paramMap.subscribe(params => {

      let id_imagen = parseInt(params.get('id'));

      if (isValidId(id_imagen)) {

        this.service.getImageById(this.auth.getIdUsuario(), id_imagen).subscribe(result => {
          if (result.response.sucessfull) {
            this.action = 'edit';
            this.imagen = result.data.imagen;
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
        // 'Nueva-imagen' es el texto que se recibe como parametro desde la url
      } else if (params.get('id') == 'Nueva-imagen') {
        this.action = 'add';
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
      nombre: new FormControl({ value: this.imagen.nombre, disabled: this.imagen.id_imagen == 1 }, [Validators.required, noWhitespaceValidator]),
      descripcion: new FormControl({ value: this.imagen.descripcion, disabled: this.imagen.id_imagen == 1 }, [Validators.required, noWhitespaceValidator]),
      imagen: new FormControl({ value: this.imagen.imagen, disabled: false }, [Validators.required, noWhitespaceValidator])
    });
  }

  submit(ev, accion) {
    ev.preventDefault();
    let msj = '';

    if (accion == 'edit') {
      msj = '¿ Está seguro de actualizar ?';
    } else if (accion == 'add') {
      msj = '¿ Está seguro de agregar ?';
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
        cancelButtonColor: '#8FB6D6',
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
            this.service.updateDatosProtectorPantalla(this.auth.getIdUsuario(), this.imagen.nombre, this.imagen.descripcion, this.imagen.id_imagen).subscribe(result => {
              if (result.response.sucessfull) {
                swal('Actualizado!', 'Datos actualizados', 'success')
              } else {
                swal('Oops...', result.response.message, 'error')
              }
            }, error => {
              swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
            });

          } else if (accion == 'add') {

            let formulario = new FormData();
            formulario.append('action', 'insertUploadProtectorPantalla');
            formulario.append('nombre', this.imagen.nombre);
            formulario.append('descripcion', this.imagen.descripcion);
            formulario.append('file', this.file_selected);
            formulario.append('id_usuario', '' + this.auth.getIdUsuario());


            this.service.insertImage(formulario).subscribe(result => {
              if (result.response.sucessfull) {
                $('#formImage')[0].reset();
                this.submitted = false;
                swal('Exito!', 'Imagen agregada', 'success')
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

  seleccionaArchivo(evt): void {
    evt.preventDefault();
    //Si existe archivo cargado
    if (evt.target.files.length > 0) {
      this.file_selected = evt.target.files[0]; // FileList object
      let size = this.file_selected.size;

      if (((size / 1024) / 1024) <= 10) {

        let reader = new FileReader();

        reader.readAsDataURL(this.file_selected);

        //Se leyó correctamente el file
        reader.onload = () => {        
          if (this.action == 'edit') {
            this.imagen.img_base64 = reader.result.split(',')[1];
            this.disabled_change_img = false;
          } else {
            this.img_selected = reader.result;
          }
        }

        //Ocurrio un error al leer file
        reader.onerror = (error) => {

        };


      } else {
        swal('Oops...', 'La imágen es demasiado grande!', 'error')
      }

    }

  }

  submitChangeImage(evt): void {
    evt.preventDefault();
    let formulario = new FormData();
    formulario.append('action', 'updateImagen');
    formulario.append('id_imagen', "" + this.imagen.id_imagen);
    formulario.append('imagen', this.imagen.imagen);
    formulario.append('file', this.file_selected);
    formulario.append('id_usuario', '' + this.auth.getIdUsuario());

    this.service.updateImagen(formulario).subscribe(result => {
      if (result.response.sucessfull) {
        this.imagen.imagen = result.response.message;
        swal('Exito!', 'Imagen actualizada', 'success')
      } else {
        swal('Oops...', result.response.message, 'error')
      }
    }, error => {
      swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
    });

  }


  eliminarImagen(imagen: Imagen) {

    /* 
     * Configuración del modal de confirmación
     */
    swal({
      title: '<span style="color: #156ab1 "> ¿ Eliminar protector de pantalla?  </span>',
      type: 'question',
      html: '<p style="color: #156ab1 ">Nombre:  <b>' + imagen.nombre + '</b>',
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

        this.service.deleteImagen(this.auth.getIdUsuario(), imagen).subscribe(result => {
          if (result.response.sucessfull) {
            this.router.navigate(['admin/Protector']);
            swal('Elimanado!', 'Protector de pantalla eliminado', 'success')
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
