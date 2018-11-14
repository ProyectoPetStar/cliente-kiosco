import { Component, OnInit } from '@angular/core';

declare const $:any;
@Component({
  selector: 'app-menu-background-image',
  templateUrl: './menu-background-image.component.html',
  styleUrls: ['./menu-background-image.component.scss']
})
export class MenuBackgroundImageComponent implements OnInit {

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

      $('[data-fancybox="gallery"]').fancybox({
        // Options will go here
      });

    },900);
  }

}
