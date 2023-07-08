import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { UsersComponent } from './users/users.component';
import { OrdersComponent } from './orders/orders.component';
import { CustomersComponent } from './customers/customers.component';
import { SharedModule } from '../shared/shared.module';
import { UpdateProductCategoryComponent } from './product-categories/update-product-category/update-product-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductCategoryComponent } from './product-categories/add-product-category/add-product-category.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';
import { ProductDetailsComponent } from './products/product-details/product-details.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ProductCategoriesComponent,
    UsersComponent,
    OrdersComponent,
    CustomersComponent,
    UpdateProductCategoryComponent,
    AddProductCategoryComponent,
    ProductsComponent,
    AddProductComponent,
    UpdateProductComponent,
    ProductDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
