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
import { MenuCatalogosComponent } from './menu-catalogos/menu-catalogos.component';
import { KioscosComponent } from './kioscos/kioscos.component';
import { AppWebComponent } from './app-web/app-web.component';
import { BackgroungImageComponent } from './backgroung-image/backgroung-image.component';

/* expectedRole: number Es el id del rol que se encuentra en la base de datos */
const routesAdministracion: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin', component: AdminLayoutComponent, children: [
      {
          path:'Perfil',
          component: UserProfileComponent
      },
      {
          path:'Dashboard',
          component: DashboardComponent
      },
      {
          path:'Catalogos',
          component: MenuCatalogosComponent
      },
      {
          path:'Kioscos',
          component: KioscosComponent
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
    NavbarComponent, UserProfileComponent, DashboardComponent, MenuCatalogosComponent, KioscosComponent, AppWebComponent, BackgroungImageComponent
  ]
})
export class AdministracionModule { }
