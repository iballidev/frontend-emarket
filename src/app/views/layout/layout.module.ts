import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HomeComponent } from '../home/home.component';
import { HeroOwlCarouselComponent } from 'src/app/components/hero-owl-carousel/hero-owl-carousel.component';
import { CategoriesListingSectionComponent } from '../home/categories-listing-section/categories-listing-section.component';
import { CategoryCardComponent } from '../home/categories-listing-section/category-card/category-card.component';
import { IconsModule } from 'src/app/icons/icons.module';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgBootstrapModule } from 'src/app/ng-bootstrap/ng-bootstrap.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    HeroOwlCarouselComponent,
    CategoriesListingSectionComponent,
    CategoryCardComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule, CarouselModule, IconsModule, NgBootstrapModule, SharedModule],
})
export class LayoutModule {}
