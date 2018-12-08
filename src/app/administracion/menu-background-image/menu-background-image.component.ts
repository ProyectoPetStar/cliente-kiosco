import { Component, OnInit } from '@angular/core';
import { Imagen } from '../../models/imagen';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, getCatalogoEstados, notify, noWhitespaceValidator } from '../../utils';
import { MenuBackgroundImageService } from './menu-background-image.service';
import swal from 'sweetalert2';

declare const $: any;
@Component({
  selector: 'app-menu-background-image',
  templateUrl: './menu-background-image.component.html',
  styleUrls: ['./menu-background-image.component.scss'],
  providers: [MenuBackgroundImageService]
})
export class MenuBackgroundImageComponent implements OnInit {

  public imagen: Imagen;
  public loading: boolean;
  public submitted: boolean;
  public formulario: FormGroup;

  constructor(
    private service: MenuBackgroundImageService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

   //this.loading = true;
    this.submitted = false;
    this.imagen = new Imagen(-1,'','','',-1,'');

    this.loadFormulario();

    setTimeout(() => {

      $(".zoom").hover(function () {

        $(this).addClass('transition');
      }, function () {

        $(this).removeClass('transition');
      });

      $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
      });

    

    }, 900);
  }

  openModal(): void {
    $('#imagenModal').modal('show')
  }

  loadFormulario(): void {
    this.formulario = this.fb.group({
      nombre: new FormControl({ value: this.imagen.nombre, disabled: false }, [Validators.required, noWhitespaceValidator]),
      descripcion: new FormControl({ value: this.imagen.descripcion, disabled: false }, [Validators.required, noWhitespaceValidator])
    });
  }

  submit(ev, accion) {
    ev.preventDefault();
    let msj = '';

    if (accion == 'edit') {
      msj = '¿ Está seguro de actualizar ?';
    } else if (accion == 'add') {
      msj = '¿ Está seguro de agregar imagen ?';
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
                  // this.service.updateKiosco(this.auth.getIdUsuario(), this.kiosco).subscribe(result => {
                  //   if (result.response.sucessfull) {
                  //     swal('Actualizado!', 'Datos actualizados', 'success')
                  //   } else {
                  //     swal('Oops...', result.response.message, 'error')
                  //   }
                  // }, error => {
                  //   swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
                  // });
                } else if (accion == 'add') {

                  // this.service.insertKiosco(this.auth.getIdUsuario(), this.kiosco).subscribe(result => {
                  //   if (result.response.sucessfull) {
                  //     $('#formKiosco')[0].reset();
                  //     this.kiosco.id_planta = -1;
                  //     this.submitted = false;
                  //     swal('Exito!', 'Kiosco registrado', 'success')
                  //   } else {
                  //     swal('Oops...', result.response.message, 'error')
                  //   }
                  // }, error => {
                  //   swal('Oops...', 'Ocurrió  un error en el servicio!', 'error')
                  // });

                }

                /*
                * Si cancela accion
                */
              } else if (result.dismiss === swal.DismissReason.cancel) {
                // this.disabledBtn = false;
              }
            })
    } else {
      //notify('Verifique los datos capturados!', 'danger', 2800);
    }

  }

  isValidImage():boolean{
    return false;
  }

}
