import { Component, OnInit } from '@angular/core';
import { Plantas } from '../../models/plantas';
import { FormPlantasService } from './form-plantas.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { isValidId, getCatalogoEstados } from '../../utils';
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
    this.planta = new Plantas(-1, '', '', '', '', -1);
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
        this.action = 'add ';
      } else {
        this.notValid = true;
        this.loading = false;
      }

    });

  }


  loadFormulario(): void {
    this.formulario = this.fb.group({
      nombre_planta: new FormControl({ value: this.planta.nombre_planta, disabled: false }, [Validators.required]),
      estado_planta: new FormControl({ value: this.planta.estado_planta, disabled: false }, [Validators.required]),
      ip_publica: new FormControl({ value: this.planta.ip_publica, disabled: false }, [Validators.required]),
      direccion_planta: new FormControl({ value: this.planta.direccion_planta, disabled: false }, [Validators.required]),
      activo: new FormControl({ value: this.planta.activo, disabled: false }, [Validators.required])
    });
  }

}
