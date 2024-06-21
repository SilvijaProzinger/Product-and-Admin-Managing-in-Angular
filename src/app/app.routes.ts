import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { ProductsComponent } from './products/products/products.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { authGuard } from './auth/auth.guard';
import { AdminsComponent } from './admins/admins/admins.component';
import { AuthErrorComponent } from './auth-error/auth-error.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  {
    path: 'products/:id',
    component: ProductDetailsComponent,
    canActivate: [authGuard],
  },
  { path: 'admins', component: AdminsComponent, canActivate: [authGuard] },
  { path: 'not-authorized', component: AuthErrorComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' },
];
