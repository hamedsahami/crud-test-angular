import { Routes } from '@angular/router';
import { CustomerEditComponent } from './customer-edit/customer-edit.component';
import {CustomerListComponent} from "./customer-list/customer-list.component";

export const CUSTOMER_ROUTES: Routes = [
  {
    path: 'customer',
    component: CustomerListComponent
  },
  {
    path: 'customer/:id',
    component: CustomerEditComponent
  },
];
