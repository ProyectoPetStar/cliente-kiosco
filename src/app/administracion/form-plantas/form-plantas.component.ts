import { Component, OnInit } from '@angular/core';
import { Plantas } from '../../models/plantas';
import { FormPlantasService } from './form-plantas.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
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

    this.route.paramMap.subscribe(params => {
      let id_planta = parseInt(params.get('id'));
      this.service.getAllPlantaById(this.auth.getIdUsuario(), id_planta).subscribe(result => {

        if (result.response.sucessfull) {
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
    });
  }


  loadFormulario(): void {
    // this.formPerfilEtad = this.fb.group({
    //   nombre: new FormControl({ value: this.usuario.nombre, disabled: true }, [Validators.required]),
    //   usuario_sonarh: new FormControl({ value: this.usuario.usuario_sonarh, disabled: true }, [Validators.required]),
    //   id_grupo: new FormControl({ value: this.usuario.id_grupo, disabled: true }, [Validators.required]),
    //   id_linea: new FormControl({ value: this.usuario.id_linea, disabled: false }, [Validators.required]),
    //   id_perfiles: new FormControl({ value: this.usuario.id_perfiles, disabled: false }, [Validators.required]),
    //   id_etad: new FormControl({ value: this.usuario.id_etad }, [Validators.required])
    // });
  }

}
