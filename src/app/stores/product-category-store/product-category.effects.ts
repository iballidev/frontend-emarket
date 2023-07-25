import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import * as fromProductCategoryActions from './product-category.actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class ProductCategoryEffects {
  loadProductCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromProductCategoryActions.loadProductCategories),
      mergeMap((data: any) => {
        return this._productCategorySvc
          .getProductCategoryList(data.queryParams)
          .pipe(
            map((response: any) => {
              return fromProductCategoryActions.loadProductCategoriesSuccess({
                productCategories: response,
              });
            }),
            catchError((error) =>
              of(
                fromProductCategoryActions.loadProductCategoriesFailure({
                  error,
                })
              )
            )
          );
      })
    );
  });

  addProductCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromProductCategoryActions.addProductCategory),
      mergeMap((payload) => {
        return this._productCategorySvc
          .createProductCategory(payload.payload)
          .pipe(
            map((data: any) => {
              let item = data.createdProductCategory;
              const newCategory = {
                ...item,
                id: item._id,
                featuredImg: item.categoryFeaturedImage,
              };
              return fromProductCategoryActions.addProductCategorySuccess({
                productCategory: newCategory,
              });
            }),
            catchError((error) =>
              of(
                fromProductCategoryActions.addProductCategoryFailure({ error })
              )
            )
          );
      })
    );
  });

  updateProductCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromProductCategoryActions.updateProductCategory),
      mergeMap((action) => {
        return this._productCategorySvc
          .updateProductCategory(action.payload)
          .pipe(
            map((data: any) => {
              const updatedCategory = {
                id: action.payload.categoryId,
                title: action.payload.category.title,
                updatedDate: action.payload.category.updatedDate,
              };
              return fromProductCategoryActions.updateProductCategorySuccess({
                productCategory: updatedCategory,
              });
            }),
            catchError((error) =>
              of(
                fromProductCategoryActions.updateProductCategoryFailure({
                  error,
                })
              )
            )
          );
      })
    );
  });

  deleteProductCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromProductCategoryActions.deleteProductCategory),
      mergeMap((action) => {
        return this._productCategorySvc.deleteProductCategory(action.id).pipe(
          map(() => {
            return fromProductCategoryActions.deleteProductCategorySuccess({
              id: action.id,
            });
          }),
          catchError((error) =>
            of(
              fromProductCategoryActions.loadProductCategoriesFailure({ error })
            )
          )
        );
      })
    );
  });

  constructor(
    private actions$: Actions,
    private _productCategorySvc: ProductCategoryService
  ) {}
}
