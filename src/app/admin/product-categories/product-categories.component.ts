import { Component, OnInit } from '@angular/core';
import { ProductCategory } from 'src/app/models/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categoryList!: ProductCategory[];
  constructor(private _productCategorySvc: ProductCategoryService) {}

  ngOnInit(): void {
    this.getProductCategoryList();
  }

  getProductCategoryList(){
    this._productCategorySvc.getProductCategoryList().subscribe({
      next: (response: any) => {
        if (response) {
          this.categoryList = response;
        }
      },
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
  }

  onDeleteCategory(CategoryId: string) {
    console.log('CategoryId: ', CategoryId);
    this._productCategorySvc.deleteProductCategory(CategoryId).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this.getProductCategoryList();
        }
      },
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
  }
}
