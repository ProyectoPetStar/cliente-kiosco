import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/dashboard', title: 'Perfil',  icon: 'person', class: '' },
    { path: '/dashboard', title: 'Catalogos',  icon: 'library_books', class: '' },
    { path: '/dashboard', title: 'Kioscos',  icon: 'devices', class: '' },
    { path: '/dashboard', title: 'Aplicaciones web',  icon: 'public', class: '' },
    { path: '/dashboard', title: 'Protector',  icon: 'photo', class: '' }
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };

}
