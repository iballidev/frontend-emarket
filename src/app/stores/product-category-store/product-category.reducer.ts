import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as ProductCategoryActions from './product-category.actions';
import { ProductCategory } from 'src/app/models/interfaces/product-category';

export const productCategoriesFeatureKey = 'productCategories';

export interface ProductCategoryState extends EntityState<ProductCategory> {
  // additional entities state properties
  error: any;
  isLoading: boolean;
  // productCategoriesFullData: any;
  info: any;
}

export const adapter: EntityAdapter<ProductCategory> =
  createEntityAdapter<ProductCategory>();

export const initialState: ProductCategoryState = adapter.getInitialState({
  // additional entity state properties
  error: undefined,
  isLoading: false,
  // productCategoriesFullData: undefined,
  info: undefined,
});

export const reducer = createReducer(
  initialState,
  /**Load Product Categories */
  on(ProductCategoryActions.loadProductCategories, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductCategoryActions.loadProductCategoriesSuccess, (state, action) =>
    adapter.setAll(action.productCategories.category, state)
  ),
  on(ProductCategoryActions.loadProductCategoriesSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      info: action.productCategories,
    };
  }),
  on(ProductCategoryActions.loadProductCategoriesFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /**Add Product Category */
  on(ProductCategoryActions.addProductCategory, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductCategoryActions.addProductCategorySuccess, (state, action) =>
    adapter.addOne(action.productCategory, state)
  ),
  on(ProductCategoryActions.addProductCategorySuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.addProductCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /**Delete Product Category */
  on(ProductCategoryActions.deleteProductCategory, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(ProductCategoryActions.deleteProductCategorySuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(ProductCategoryActions.deleteProductCategorySuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.deleteProductCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /**Update Product Category */
  on(ProductCategoryActions.updateProductCategory, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(
    ProductCategoryActions.updateProductCategorySuccess,
    (state, action: any) => adapter.updateOne(action.productCategory, state)
  ),
  // on(
  //   ProductCategoryActions.updateProductCategorySuccess,
  //   (state, action: any) => {
  //     // const updatedItem = state.entities.find((item)=>item.id === action.productCategory.id)
  //     console.warn('state.entities: ', state.entities);
  //     console.warn('action: ', action);
  //     return {
  //       ...state,
  //     };
  //   }
  // ),
  on(ProductCategoryActions.updateProductCategorySuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(ProductCategoryActions.updateProductCategoryFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  })

  // on(ProductCategoryActions.addProductCategory,
  //   (state, action) => adapter.addOne(action.productCategory, state)
  // ),
  // on(ProductCategoryActions.upsertProductCategory,
  //   (state, action) => adapter.upsertOne(action.productCategory, state)
  // ),
  // on(ProductCategoryActions.addProductCategorys,
  //   (state, action) => adapter.addMany(action.productCategorys, state)
  // ),
  // on(ProductCategoryActions.upsertProductCategorys,
  //   (state, action) => adapter.upsertMany(action.productCategorys, state)
  // ),
  // on(ProductCategoryActions.updateProductCategory,
  //   (state, action) => adapter.updateOne(action.productCategory, state)
  // ),
  // on(ProductCategoryActions.updateProductCategorys,
  //   (state, action) => adapter.updateMany(action.productCategorys, state)
  // ),
  // on(ProductCategoryActions.deleteProductCategory,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(ProductCategoryActions.deleteProductCategorys,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(ProductCategoryActions.loadProductCategorys,
  //   (state, action) => adapter.setAll(action.productCategorys, state)
  // ),
  // on(ProductCategoryActions.clearProductCategorys,
  //   state => adapter.removeAll(state)
  // ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
