import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';
import { AuthGuard } from './services/auth.guard';
import { AuthAdminGuard } from './services/auth-admin.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'app' },
  {
    path: 'app',
    loadChildren: () =>
      import('./views/layout/layout.module').then((mod) => mod.LayoutModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'user',
    // canActivate: [AuthGuard],
    loadChildren: () =>
      import('./user/user.module').then((mod) => mod.UserModule),
  },
  {
    path: 'orders',
    canActivate: [AuthGuard, AuthAdminGuard],
    loadChildren: () =>
      import('./orders/orders.module').then((mod) => mod.OrdersModule),
  },
  {
    path: 'ngrx-practicals',
    loadChildren: () =>
      import('./ngrx-practical/ngrx-practical.module').then((mod) => mod.NgrxPracticalModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
