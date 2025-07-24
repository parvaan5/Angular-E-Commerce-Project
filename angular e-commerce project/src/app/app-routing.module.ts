import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerComponent } from './seller/seller.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchComponent } from './search/search.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'seller',
    component: SellerComponent,
  },
  {
    path: 'seller-home',
    component: SellerHomeComponent,
    canActivate: [AuthGuard],
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateProductComponent,
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard],
  },
  {
    component: SearchComponent,
    path: 'search/:query'
  },
  {
    component:ProductDetailsComponent,
    path:'details/:productid'
  },
  {
    component:UserAuthComponent,
    path:'user-auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
