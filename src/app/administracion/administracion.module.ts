import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';

/* expectedRole: number Es el id del rol que se encuentra en la base de datos */
const routesAdministracion: Routes = [
  {
    path: '', component: AdminLayoutComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'home', component: AdminLayoutComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    RouterModule.forChild(routesAdministracion)
  ],
  declarations: [AdminLayoutComponent, LoginComponent]
})
export class AdministracionModule { }
