import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { CustomersComponent } from './customers/customers.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { UpdateProductCategoryComponent } from './product-categories/update-product-category/update-product-category.component';
import { ProductsComponent } from './products/products.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'product-categories', component: ProductCategoriesComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'add-product', component: AddProductComponent },
      // { path: 'product-details/:productId', component: UpdateProductComponent },
      { path: 'update-product/:productId', component: UpdateProductComponent },
      {
        path: 'product-categories/:categoryId',
        component: UpdateProductCategoryComponent,
      },
      { path: 'users', component: UsersComponent },
      { path: 'customers', component: CustomersComponent },
      { path: 'orders', component: OrdersComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
