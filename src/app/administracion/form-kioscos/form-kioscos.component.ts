import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormKioscosService } from './form-kioscos.service';
import { FormPlantasService } from '../form-plantas/form-plantas.service';
import { isValidId, noWhitespaceValidator } from '../../utils';
import { Kiosco } from '../../models/kiosco';
import swal from 'sweetalert2';
import { Plantas } from '../../models/plantas';

@Component({
  selector: 'app-form-kioscos',
  templateUrl: './form-kioscos.component.html',
  styleUrls: ['./form-kioscos.component.scss'],
  providers: [FormKioscosService, FormPlantasService]
})
export class FormKioscosComponent implements OnInit {

  public loading: boolean;
  public notValid: boolean;
  public action: string;
  public kiosco: Kiosco;
  public planta: Plantas;
  public submitted: boolean;
  public formulario: FormGroup;

  constructor(
    private auth: AuthService,
    private service: FormKioscosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.submitted = false;
    this.action = '';
    this.planta = new Plantas(-1, '', '', '', '', -1);
    this.kiosco = new Kiosco(-1, '', -1, '', '', '', -1, -1, '', '', '', '', this.planta);

    this.route.paramMap.subscribe(params => {

      let id_kiosko = parseInt(params.get('id'));

      if (isValidId(id_kiosko)) {

        this.service.getKioscoById(this.auth.getIdUsuario(), id_kiosko).subscribe(result => {

          if (result.response.sucessfull) {
            this.action = 'edit';
            this.kiosco = result.data.kiosco;
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
        // 'Nuevo-kiosco' es el texto que se recibe como parametro desde la url
      } else if (params.get('id') == 'Nuevo-kiosco') {
        this.action = 'add';
        this.kiosco.activo = 1;
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
      nombre_kiosko: new FormControl({ value: this.kiosco.nombre_kiosko, disabled: false }, [Validators.required, noWhitespaceValidator ]),
      id_planta: new FormControl({ value: this.kiosco.id_planta, disabled: false }, [Validators.required]),
      ip_privada: new FormControl({ value: this.kiosco.ip_privada, disabled: false }, [Validators.required, Validators.pattern(/^([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])\.([01]?\d\d?|2[0-4]\d|25[0-5])$/)]),
      marca_kiosco: new FormControl({ value: this.kiosco.marca_kiosco, disabled: false }, [Validators.required, noWhitespaceValidator]),
      modelo_kiosco: new FormControl({ value: this.kiosco.modelo_kiosco, disabled: false }, [Validators.required, noWhitespaceValidator])
    });
  }

  changeStatus(estatus: number) {
    this.kiosco.activo = (estatus == 0) ? 1 : 0;
  }

}
