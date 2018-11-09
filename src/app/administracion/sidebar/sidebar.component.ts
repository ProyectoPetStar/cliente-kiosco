import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { notify } from '../../utils';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: './Dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: './Perfil', title: 'Perfil',  icon: 'person', class: '' },
    { path: './Catalogos', title: 'Catalogos',  icon: 'library_books', class: '' },
    { path: './Kioscos', title: 'Kioscos',  icon: 'devices', class: '' },
    { path: './Aplicaciones-Web', title: 'Aplicaciones web',  icon: 'public', class: '' },
    { path: './Protector', title: 'Protector',  icon: 'photo', class: '' }
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

  logout(event) {

    event.preventDefault();

    try {
        if (localStorage.datos_usuario_kiosco) {
            localStorage.removeItem('datos_usuario_kiosco');
        }
    } catch (e) { }

    try {
        if (localStorage.token_kiosco) {
            localStorage.removeItem('token_kiosco');
        }
    } catch (e) {
        notify('No se pudo cerrar sesión!', 'danger', 3000);
    }
    this.router.navigate(['administracion/login']);

}

}
