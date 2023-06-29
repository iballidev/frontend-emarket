import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserRoutingModule } from './user-routing.module';
import { UserAccountComponent } from './user-account/user-account.component';
import { SharedModule } from '../shared/shared.module';
import { WishlistComponent } from './wishlist/wishlist.component';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserShoppingCartComponent } from './user-shopping-cart/user-shopping-cart.component';

@NgModule({
  declarations: [UserComponent, UserAccountComponent, WishlistComponent, UserOrdersComponent, UserShoppingCartComponent],
  imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
