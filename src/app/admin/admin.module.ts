import { NgModule } from '@angular/core';
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
import { FormsModule } from '@angular/forms';
import { AddProductCategoryComponent } from './product-categories/add-product-category/add-product-category.component';

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
  ],
  imports: [CommonModule, AdminRoutingModule, SharedModule, FormsModule],
})
export class AdminModule {}
