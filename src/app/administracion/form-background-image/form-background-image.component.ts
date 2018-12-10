import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, noWhitespaceValidator, notify, getFechaActual } from '../../utils';
import { FormBackgroundImageService } from './form-background-image.service';
import { Imagen } from '../../models/imagen';
import swal from 'sweetalert2';


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
    this.imagen = new Imagen(-1,'','','',-1,'');

    this.route.paramMap.subscribe(params => {

      let id_imagen = parseInt(params.get('id'));

      if (isValidId(id_imagen)) {

        this.service.getImageById(this.auth.getIdUsuario(), id_imagen).subscribe(result => {

          if (result.response.sucessfull) {
            this.action = 'edit';
            // this.planta = result.data.planta;
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
      nombre: new FormControl({ value: this.imagen.nombre, disabled: false }, [Validators.required, noWhitespaceValidator]),
      descripcion: new FormControl({ value: this.imagen.descripcion, disabled: false }, [Validators.required, noWhitespaceValidator]),
      imagen: new FormControl({ value: this.imagen.imagen, disabled: false }, [Validators.required, noWhitespaceValidator])
    });
  }

}
