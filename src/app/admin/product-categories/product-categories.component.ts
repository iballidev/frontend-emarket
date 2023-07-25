import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategory } from 'src/app/models/interfaces/product-category';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { AddProductCategoryComponent } from './add-product-category/add-product-category.component';
import { AuthService } from 'src/app/services/auth.service';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AppError } from 'src/app/common/app-error';
import { NotFoundError, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ProductCategoryState } from 'src/app/stores/product-category-store/product-category.reducer';
import * as fromProductCategoryActions from '../../stores/product-category-store/product-category.actions';
import * as fromModalDialogControlActions from '../../stores/modal-dialog-control-store/modal-dialog-control.actions';
import {
  selectProductCategories,
  selectProductCategoryInfo,
} from 'src/app/stores/product-category-store/product-category.selectors';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss'],
})
export class ProductCategoriesComponent implements OnInit {
  categoryList!: ProductCategory[];
  categoryList$: Observable<any> = this.store.pipe(
    select(selectProductCategories)
  );
  productCategoryInfo$: Observable<any> = this.store.pipe(
    select(selectProductCategoryInfo)
  );
  btnTitle: string = 'Add category';
  pageNumber!: number;
  pageSize!: number;
  // pageSize: number = 2;
  totalCount!: number;
  userProfile: any;
  constructor(
    private _productCategorySvc: ProductCategoryService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private _userProfileSvc: UserProfileService,
    private store: Store<ProductCategoryState>
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

    this.store.dispatch(
      fromProductCategoryActions.loadProductCategories({
        queryParams: buildQueryParams(userQuery),
      })
    );

    this.categoryList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.categoryList = response;
        }
      },
    });

    this.productCategoryInfo$.subscribe({
      next: (response: any) => {
        if (response) {
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
      },
    });
  }

  openAddProductCategory($event: boolean) {
    const modalComponent = {
      _component: AddProductCategoryComponent,
      message: 'Create a new product category',
    };
    if ($event)
      this.store.dispatch(
        fromModalDialogControlActions.openModal({ modalComponent })
      );

    // if ($event) {
    //   const modalRef = this.modalService.open(AddProductCategoryComponent, {
    //     centered: true,
    //   });
    //   // const modalRef = this.modalService.open(AddProductCategoryComponent, { fullscreen: true });
    //   modalRef.componentInstance.description = 'Create a new product category';
    // }
  }

  onDeleteCategory(CategoryId: string) {
    this.store.dispatch(
      fromProductCategoryActions.deleteProductCategory({ id: CategoryId })
    );
    // this._productCategorySvc.deleteProductCategory(CategoryId).subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       this.getProductCategoryList();
    //     }
    //   },
    //   error: (err: AppError) => {
    //     if (err instanceof NotFoundError) alert('item not found'!);
    //     else throw err;
    //   },
    // });
  }

  pageChangeEvent($event: any) {
    this.pageNumber = $event;
    const queryParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    let userQuery = {
      pageSize: queryParams.pageSize,
      pageNumber: queryParams.pageNumber,
    };

    this.store.dispatch(
      fromProductCategoryActions.loadProductCategories({
        queryParams: buildQueryParams(userQuery),
      })
    );

    this.productCategoryInfo$.subscribe({
      next: (response: any) => {
        if (response) {
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
      },
    });
  }
}
