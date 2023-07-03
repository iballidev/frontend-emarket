import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categoryList!: ProductCategory[];
  constructor(
    private _productCategorySvc: ProductCategoryService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _authSvc: AuthService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this._authSvc.RefreshToken.subscribe(
      (response: any) => {
        console.log('response: ', response);
      },
      (err: any) => {
        console.error('Error: ', err);
      }
    );
    this.getProductCategoryList();

    this.modalService.activeInstances.subscribe((modalList) => {
      /**loads the list of categories when their is no opened modal (modal closes) */
      if (!modalList.length) this.getProductCategoryList();
    });
  }

  getProductCategoryList() {
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

  open() {
    const modalRef = this.modalService.open(AddProductCategoryComponent, {
      centered: true,
    });
    // const modalRef = this.modalService.open(AddProductCategoryComponent, { fullscreen: true });
    modalRef.componentInstance.description = 'Create a new product category';
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
