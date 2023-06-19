import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hero-slider',
  templateUrl: './hero-slider.component.html',
  styleUrls: ['./hero-slider.component.scss'],
  standalone: true,
  imports: [NgbCarouselModule, NgIf],
})
export class HeroSliderComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1300/500`);
  imgBanner1 = '../../../assets/images/Group-1000000789.jpg';
  imgBanner2 = '../../../assets/images/Frame-675.jpg';
  images = [this.imgBanner1, this.imgBanner2];
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.showNavigationArrows = true;
    config.showNavigationIndicators = false;
  }

  ngOnInit(): void {}
}
