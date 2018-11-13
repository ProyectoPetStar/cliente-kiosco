import { Component, OnInit } from '@angular/core';

declare const $:any;
@Component({
  selector: 'app-menu-backgroung-image',
  templateUrl: './menu-backgroung-image.component.html',
  styleUrls: ['./menu-backgroung-image.component.scss']
})
export class MenuBackgroungImageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    setTimeout(() => {
      // $(".fancybox").fancybox({
      //   openEffect: "none",
      //   closeEffect: "none"
      // });

      $(".zoom").hover(function () {

        $(this).addClass('transition');
      }, function () {

        $(this).removeClass('transition');
      });
    },900);
  }

}
