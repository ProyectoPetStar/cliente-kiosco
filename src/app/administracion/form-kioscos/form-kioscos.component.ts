import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { FormKioscosService } from './form-kioscos.service';

@Component({
  selector: 'app-form-kioscos',
  templateUrl: './form-kioscos.component.html',
  styleUrls: ['./form-kioscos.component.scss'],
  providers: [ FormKioscosService ]
})
export class FormKioscosComponent implements OnInit {

  public loading: boolean;
  public notValid: boolean;
  public action: string;

  constructor(
    private auth: AuthService,
    private service: FormKioscosService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
  }

}
