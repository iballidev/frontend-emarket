import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-categories-listing-section',
  templateUrl: './categories-listing-section.component.html',
  styleUrls: ['./categories-listing-section.component.scss'],
})
export class CategoriesListingSectionComponent implements OnInit {
  productCategory!: ProductCategory[];
  constructor(private _ProductCategorySvc: ProductCategoryService) {}

  ngOnInit(): void {
    this._ProductCategorySvc.getProductCategoryList().subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        this.productCategory = response;
      },
      error: (err: any) => {
        console.error('error: ', err);
      },
    });
  }
}

export interface Category {
  id: string;
  title: string;
  featuredImg: string;
  categoryUrl: string;
}
