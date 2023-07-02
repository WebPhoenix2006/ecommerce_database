import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o/';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 500,
    // autoplay: true,
    // animateIn: true,
    // animateOut: true,
    navText: ['<i class="fa fa-angle-left d-none"></i>', '<i class="fa fa-angle-right d-none"></i>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      1300: {
        items: 1
      }
    },
    nav: true
  }
  cat_images = [
    {tag: 'GLASSES', img_src: 'assets/img/gallery/popular1.png'},
    {tag: 'WATCHES', img_src: 'assets/img/gallery/popular2.png'},
    {tag: 'JACKETS', img_src: 'assets/img/gallery/popular3.png'},
    {tag: 'CLOTHES', img_src: 'assets/img/gallery/popular4.png'}
  ];
  products = [
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival1.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival2.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival3.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival4.png'},
    {title: 'Knitte Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival5.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival6.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival7.png'},
    {title: 'Knitted Jumper', price: '$ ' + 30.00, img_src: 'assets/img/gallery/arrival8.png'},
  ]
}
