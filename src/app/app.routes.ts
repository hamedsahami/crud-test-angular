import {ExtraOptions, PreloadAllModules, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CustomerListComponent} from "./customer/customer-list/customer-list.component";
import {CUSTOMER_ROUTES} from "./customer/customer.routes";

export const APP_ROUTES: Routes = [
  ...CUSTOMER_ROUTES,
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: CustomerListComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  },
]

export const APP_EXTRA_OPTIONS: ExtraOptions = {
  preloadingStrategy: PreloadAllModules
}
