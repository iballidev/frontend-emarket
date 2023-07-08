import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  btnTitle: string = 'Add product';
  btnType: string = 'submit';
  pageNumber!: number;
  pageSize!: number;
  totalCount!: number;
  products: any;
  constructor(private _productSvc: ProductService, private _router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    let userQuery = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    // this._productCategorySvc.getProductCategoryList(buildQueryParams(userQuery)).subscribe({
    this._productSvc
      .getProductCategoryList(buildQueryParams(userQuery))
      .subscribe({
        next: (response) => {
          if (response) {
            console.log('response: ', response);
            this.products = response.products;
            this.pageNumber = response.pageNumber;
            this.pageSize = response.pageSize;
            this.totalCount = response.count;
          }
        },
        error: (err: any) => {
          if (err) console.warn('Error: ', err);
        },
      });
  }

  AddProduct() {
    this._router.navigate(['/admin/add-product']);
  }

  onDeleteProduct(product: any) {}

  openAddProductCategory($event: boolean) {}

  pageChangeEvent($event: any) {
    this.pageNumber = $event;
    console.log('Paginate: ', this.pageSize, this.pageNumber);
    const queryParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      s: 2,
    };
    let userQuery = {
      pageSize: queryParams.pageSize,
      pageNumber: queryParams.pageNumber,
    };
    this._productSvc
      .getProductCategoryList(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.products = response.category;
            this.pageNumber = response.pageNumber;
            this.pageSize = response.pageSize;
            this.totalCount = response.count;
          }
        },
        error: (err: any) => {
          console.error('Error: ', err);
        },
      });
  }
}
