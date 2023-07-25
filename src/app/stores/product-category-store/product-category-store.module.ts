import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromProductCategory from './product-category.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProductCategoryEffects } from './product-category.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromProductCategory.productCategoriesFeatureKey, fromProductCategory.reducer),
    EffectsModule.forFeature([ProductCategoryEffects]),
  ],
  exports:[
    StoreModule,
    EffectsModule],
})
export class ProductCategoryStoreModule { }
