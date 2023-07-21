import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { AuthService } from 'src/app/services/auth.service';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError } from 'rxjs';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categoryList!: ProductCategory[];
  btnTitle: string = 'Add category';
  pageNumber!: number;
  pageSize!: number;
  totalCount!: number;
  userProfile: any;
  constructor(
    private _productCategorySvc: ProductCategoryService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _userProfileSvc: UserProfileService
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.getProductCategoryList();

    this.modalService.activeInstances.subscribe((modalList) => {
      /**loads the list of categories when their is no opened modal (modal closes) */
      if (!modalList.length) this.getProductCategoryList();
    });
  }

  getProductCategoryList() {
    let userQuery = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    this._productCategorySvc
      .getProductCategoryList(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.categoryList = response.category;
            this.pageNumber = response.pageNumber;
            this.pageSize = response.pageSize;
            this.totalCount = response.count;
          }
        },
      });
  }

  openAddProductCategory($event: boolean) {
    if ($event) {
      const modalRef = this.modalService.open(AddProductCategoryComponent, {
        centered: true,
      });
      // const modalRef = this.modalService.open(AddProductCategoryComponent, { fullscreen: true });
      modalRef.componentInstance.description = 'Create a new product category';
    }
  }

  onDeleteCategory(CategoryId: string) {
    this._productCategorySvc.deleteProductCategory(CategoryId).subscribe({
      next: (response: any) => {
        if (response) {
          this.getProductCategoryList();
        }
      },
      error: (err: AppError) => {
        if (err instanceof NotFoundError) alert('item not found'!);
        else throw err;
      },
    });
  }

  pageChangeEvent($event: any) {
    this.pageNumber = $event;
    console.log('Paginate: ', this.pageSize, this.pageNumber);
    const queryParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    let userQuery = {
      pageSize: queryParams.pageSize,
      pageNumber: queryParams.pageNumber,
    };
    this._productCategorySvc
      .getProductCategoryList(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.categoryList = response.category;
            this.pageNumber = response.pageNumber;
            this.pageSize = response.pageSize;
            this.totalCount = response.count;
          }
        },
      });
  }
}
