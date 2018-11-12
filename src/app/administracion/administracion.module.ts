import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuPlantasComponent } from './menu-plantas/menu-plantas.component';
import { MenuKioscosComponent } from './menu-kioscos/menu-kioscos.component';
import { AppWebComponent } from './app-web/app-web.component';
import { BackgroungImageComponent } from './backgroung-image/backgroung-image.component';
import { AuthGuardAdmon } from '../auth/auth.guard.admon';
import { NotAuthGuard } from '../auth/not.auth.guard';

/* expectedRole: number Es el id del rol que se encuentra en la base de datos */
const routesAdministracion: Routes = [
  {
    path: 'login', component: LoginComponent, canActivate: [ NotAuthGuard ]
  },
  {
    path: 'admin', component: AdminLayoutComponent,  canActivate:[AuthGuardAdmon], children: [
      {
          path:'Perfil',
          component: UserProfileComponent
      },
      {
          path:'Dashboard',
          component: DashboardComponent
      },
      {
          path:'Plantas',
          component: MenuPlantasComponent
      },
      {
          path:'Kioscos',
          component: MenuKioscosComponent
      },
      {
          path:'Aplicaciones-Web',
          component: AppWebComponent
      },
      {
          path:'Protector',
          component: BackgroungImageComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(routesAdministracion)
  ],
  declarations: [
    AdminLayoutComponent, 
    LoginComponent, 
    FooterComponent, 
    SidebarComponent, 
    NavbarComponent, 
    UserProfileComponent, 
    DashboardComponent, 
    MenuPlantasComponent, 
    MenuKioscosComponent, 
    AppWebComponent, 
    BackgroungImageComponent
  ],
  providers:[
    AuthGuardAdmon,
    NotAuthGuard
  ]
})
export class AdministracionModule { }
