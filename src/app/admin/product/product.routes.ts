import { Routes } from '@angular/router';

import { HeaderComponent } from '../layout/header/header.component';
import { SidebarComponent } from '../layout/sidebar/sidebar.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { ProductListComponent } from './product-list/product-list.component';

import { AuthGuard as AuthGuard } from '../services/auth/auth.guard';
import { AuthCheckService as AuthCheck } from '../services/auth/auth-check.service';


 
export const productRoutes: Routes = [
{ path: '',
component: ProductListComponent, canActivate: [AuthGuard],
}, 
{ path: '**', redirectTo: 'products' }
];

