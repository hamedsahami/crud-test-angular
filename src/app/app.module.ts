import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {SidebarComponent} from "./sidebar/sidebar.component";
import {NavbarComponent} from "./navbar/navbar.component";

import {RouterModule} from "@angular/router";
import {APP_EXTRA_OPTIONS, APP_ROUTES} from "./app.routes";
import {FormsModule} from "@angular/forms";
import {CUSTOMER_ROUTES} from "./customer/customer.routes";
import {HomeComponent} from "./home/home.component";
import {CustomerModule} from "./customer/customer.module";
import {HttpClientModule} from "@angular/common/http";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpClientModule,   FormsModule,
    RouterModule.forRoot([...APP_ROUTES], {...APP_EXTRA_OPTIONS}),
    // RouterModule.forRoot([...CUSTOMER_ROUTES], {...APP_EXTRA_OPTIONS}),
  ],
  providers: [CustomerModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
