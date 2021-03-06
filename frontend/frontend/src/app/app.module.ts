import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogoComponent } from './logo/logo.component';
import { NavComponent } from './nav/nav.component';
import { CatlogComponent } from './catlog/catlog.component';

import { HttpClientModule } from '@angular/common/http';
import{items} from './classes/items';
import {freeapiservice} from './service/freeapi.service';
import {CommonService} from './service/common.service';

import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ItemViewComponent } from './item-view/item-view.component';
import { FloatCartComponent } from './float-cart/float-cart.component';
import { BannerComponent } from './banner/banner.component';
import { PaymentComponent } from './payment/payment.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { ReciptComponent } from './recipt/recipt.component'



@NgModule({
  declarations: [
    AppComponent,
    LogoComponent,
    NavComponent,
    CatlogComponent,
    LoginComponent,
    CheckoutComponent,
    ItemViewComponent,
    FloatCartComponent,
    BannerComponent,
    PaymentComponent,
    CreditCardComponent,
    ReciptComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
     
  ],
  providers: [freeapiservice,
              items,
              CommonService
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
