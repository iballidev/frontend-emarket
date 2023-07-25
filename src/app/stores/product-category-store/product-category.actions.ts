import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ProductCategory } from 'src/app/models/interfaces/product-category';

/**LOAD PRODUCT CAREGORY LIST */
export const loadProductCategories = createAction(
  '[ProductCategories Component] Load ProductCategories',
  props<{ queryParams: any }>()
);
export const loadProductCategoriesSuccess = createAction(
  '[ProductCategory Effects] Load ProductCategories Success',
  props<{ productCategories: any }>()
);
export const loadProductCategoriesFailure = createAction(
  '[ProductCategory Effects] Load ProductCategories Failure',
  props<{ error: any }>()
);

/**ADD PRODUCT CAREGORY */
export const addProductCategory = createAction(
  '[Add ProductCategory Component] Add ProductCategory',
  props<{ payload: any }>()
);

export const addProductCategorySuccess = createAction(
  '[Add ProductCategory Effect] Add ProductCategory Success',
  props<{ productCategory: ProductCategory }>()
);

export const addProductCategoryFailure = createAction(
  '[Add ProductCategory Effect] Add ProductCategory Failure',
  props<{ error: any }>()
);

/**UPDATE PRODUCT CAREGORY */
export const updateProductCategory = createAction(
  '[Update ProductCategory Component] Update ProductCategory',
  props<{ payload: any }>()
);

export const updateProductCategorySuccess = createAction(
  '[Update ProductCategory Effect] Update ProductCategory Success',
  props<{ productCategory: any }>()
);

export const updateProductCategoryFailure = createAction(
  '[Update ProductCategory Effect] Update ProductCategory Failure',
  props<{ error: any }>()
);

/**DELETE PRODUCT CAREGORY */
export const deleteProductCategory = createAction(
  '[ProductCategory/API] Delete ProductCategory',
  props<{ id: string }>()
);

export const deleteProductCategorySuccess = createAction(
  '[ProductCategory/API] Delete ProductCategory Success',
  props<{ id: string }>()
);

export const deleteProductCategoryFailure = createAction(
  '[ProductCategory/API] Delete ProductCategory Failure',
  props<{ error: any }>()
);

// export const loadProductCategorys = createAction(
//   '[ProductCategory/API] Load ProductCategorys',
//   props<{ productCategorys: ProductCategory[] }>()
// );

// export const addProductCategory = createAction(
//   '[ProductCategory/API] Add ProductCategory',
//   props<{ productCategory: ProductCategory }>()
// );

// export const upsertProductCategory = createAction(
//   '[ProductCategory/API] Upsert ProductCategory',
//   props<{ productCategory: ProductCategory }>()
// );

// export const addProductCategorys = createAction(
//   '[ProductCategory/API] Add ProductCategorys',
//   props<{ productCategorys: ProductCategory[] }>()
// );

// export const upsertProductCategorys = createAction(
//   '[ProductCategory/API] Upsert ProductCategorys',
//   props<{ productCategorys: ProductCategory[] }>()
// );

// export const updateProductCategory = createAction(
//   '[ProductCategory/API] Update ProductCategory',
//   props<{ productCategory: Update<ProductCategory> }>()
// );

// export const updateProductCategorys = createAction(
//   '[ProductCategory/API] Update ProductCategorys',
//   props<{ productCategorys: Update<ProductCategory>[] }>()
// );

// export const deleteProductCategory = createAction(
//   '[ProductCategory/API] Delete ProductCategory',
//   props<{ id: string }>()
// );

// export const deleteProductCategorys = createAction(
//   '[ProductCategory/API] Delete ProductCategorys',
//   props<{ ids: string[] }>()
// );

// export const clearProductCategorys = createAction(
//   '[ProductCategory/API] Clear ProductCategorys'
// );
