import { Component, OnInit } from '@angular/core';

declare const $: any;
declare const WOW: any;


@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: [
    './portal.component.scss',
    '../../../assets/css/style.css',
    '../../../assets/css/animate.min.css'
  ]
})
export class PortalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      $('.section-labs').hide();
      new WOW().init();
    }, 150);
  }

}
