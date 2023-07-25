import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  ProductCategoryState,
  adapter,
  productCategoriesFeatureKey,
  selectAll,
} from './product-category.reducer';

export const selectProductCategoryState =
  createFeatureSelector<ProductCategoryState>(productCategoriesFeatureKey);

export const selectProductCategories = createSelector(
  selectProductCategoryState,
  selectAll
);
export const selectProductCategoryInfo = createSelector(
  selectProductCategoryState,
  (state: ProductCategoryState) => state.info
);

export const selectedProductCategory = createSelector(
  selectProductCategoryState,
  adapter.getSelectors().selectAll
);

export const selectedError = createSelector(
  selectProductCategoryState,
  (state: ProductCategoryState) => state.error
);
