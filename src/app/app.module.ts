import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { DashComponent } from './dash/dash.component';
import { ParentComponent } from './parent/parent.component';
import { ChildComponent } from './child/child.component';
import { CatalogComponent } from './catalog/catalog.component';

import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ShiptoComponent } from './shipto/shipto.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';


const routes: Routes =
[
	{ path: '', redirectTo: '/dash', pathMatch: "full" },
  { path: 'app', component: AppComponent },
  { path: 'first', component: FirstComponent },
  { path: 'second', component: SecondComponent },
  { path: 'dash', component: DashComponent },
  { path: 'child', component: ChildComponent },
  { path: 'parent', component: ParentComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'shipto', component: ShiptoComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: '**', component: CatalogComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    FirstComponent,
    SecondComponent,
    DashComponent,
    ParentComponent,
    ChildComponent,
    CatalogComponent,
    CategoryComponent,
    ProductComponent,
    ShiptoComponent,
    CartComponent,
    CheckoutComponent,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
