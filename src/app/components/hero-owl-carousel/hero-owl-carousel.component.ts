import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-hero-owl-carousel',
  templateUrl: './hero-owl-carousel.component.html',
  styleUrls: ['./hero-owl-carousel.component.scss'],
})
export class HeroOwlCarouselComponent implements OnInit {
  imgBanner1: string = '../../../assets/images/hero-banner-1.jpg';
  imgBanner2: string = '../../../assets/images/hero-banner-2.jpg';
  imgBanner3: string = '../../../assets/images/hero-banner-3.jpg';
  imgBanner4: string =  '../../../assets/images/hero-banner-4.jpg';
  // images = [this.imgBanner1, this.imgBanner2];
  sliderImages = [
    {
      id: '1',
      src: this.imgBanner1,
      alt: '',
      discription: {
        title: 'Shop Gaming Essentials',
        tagline: 'Gaming Collections',
      },
      // salesLabel: 'New Summer Collection',
    },
    {
      id: '2',
      src: this.imgBanner2,
      alt: '',
      discription: {
        title: 'Children\'s Toys',
        tagline: 'Toy Stories',
      },
      salesLabel: 'New Summer Collection',
    },
    {
      id: '3',
      src: this.imgBanner3,
      alt: '',
      discription: {
        title: 'Women\'s Wears',
        tagline: 'Boutique',
      },
      salesLabel: 'New Summer Collection',
    },
    {
      id: '4',
      src: this.imgBanner4,
      alt: '',
      discription: {
        title: 'Men\'s Fashion',
        tagline: 'Boutique',
      },
      salesLabel: 'New Summer Collection',
    },
  ];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    // autoplay: true,
    animateOut: 'fadeOut',
    items: 1,
    // responsive: {
    //   0: {
    //     items: 1,
    //   },
    //   400: {
    //     items: 2,
    //   },
    //   740: {
    //     items: 3,
    //   },
    //   940: {
    //     items: 4,
    //   },
    // },
    nav: true,
  };
  constructor() {}

  ngOnInit(): void {}
}
