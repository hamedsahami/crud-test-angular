import { NgModule } from '@angular/core';
import {CommonModule, JsonPipe} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerService } from './customer.service';
// import { FLIGHT_ROUTES } from './customer.routes';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerEditComponent} from "./customer-edit/customer-edit.component";
import {CUSTOMER_ROUTES} from "./customer.routes";
import {BrowserModule} from "@angular/platform-browser";
import * as googleLibphonenumber from 'google-libphonenumber';

// @ts-ignore
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(CUSTOMER_ROUTES)
  ],
  declarations: [
    CustomerListComponent,
    CustomerEditComponent,

  ],
  providers: [CustomerService],
  exports: []
})
export class CustomerModule { }
