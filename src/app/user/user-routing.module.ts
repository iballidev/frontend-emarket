import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserShoppingCartComponent } from './user-shopping-cart/user-shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: UserAccountComponent,
      },
      {
        path: 'my-account',
        component: UserAccountComponent,
      },
      {
        path: 'my-orders',
        component: UserOrdersComponent,
      },
      {
        path: 'shopping-cart',
        component: UserShoppingCartComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
