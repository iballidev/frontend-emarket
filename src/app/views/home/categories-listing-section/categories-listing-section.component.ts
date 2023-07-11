import { Component, OnInit } from '@angular/core';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
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
    let userQuery = {
      pageSize: 6,
      pageNumber: 1,
    };
    this._ProductCategorySvc.getProductCategoryList(buildQueryParams(userQuery)).subscribe({
      next: (response: any) => {
        this.productCategory = response.category;
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
