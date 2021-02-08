import { BrowserModule } from '@angular/platform-browser';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import { LayoutComponent } from './admin/layout/layout.component';
/*import { HeaderComponent } from './admin/layout/header/header.component';
import { SidebarComponent } from './admin/layout/sidebar/sidebar.component';
import { FooterComponent } from './admin/layout/footer/footer.component';
*/
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { UsersComponent } from './admin/users/users.component';
import { LoginComponent } from './admin/login/login.component';
import { DynaFormComponent } from './front/dyna-form/dyna-form.component';
import { FrontComponent } from './front/front.component';
import { HomeComponent } from './front/home/home.component';

import { routes } from './app.routes';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';

import { AuthGuard  } from './admin/services/auth/auth.guard';
import { AuthCheckService  } from './admin/services/auth/auth-check.service';
import { AuthService  } from './admin/services/auth/auth.service';
import { Path } from './admin/services/config/path';
import { AdminComponent } from './admin/admin.component';

import { PartialModule } from './partial/partial.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import { CustomMaterialModule } from './core/material.module';

import {
  MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
  MatSelectModule,
  MatToolbarModule, MatMenuModule,MatIconModule, MatProgressSpinnerModule,MatDatepickerModule
} from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatNativeDateModule} from '@angular/material';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { OrderEntryComponent } from './admin/order-entry/order-entry.component';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
//import { ModalModule } from 'ngx-bootstrap/modal';
import { SimpleModalModule } from 'ngx-simple-modal';



@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    /*HeaderComponent,
    SidebarComponent,
    FooterComponent,*/
    DashboardComponent,
    UsersComponent,
    LoginComponent,
    DynaFormComponent,
    FrontComponent,
    HomeComponent,
    
    OrderEntryComponent,
  ],
  imports: [
    SimpleModalModule,
    NgxMatSelectSearchModule,
    MatSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    
    MatInputModule,
    PartialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    FlashMessagesModule,
    RouterModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
    Ng4LoadingSpinnerModule.forRoot(),
   
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  entryComponents: [
    OrderEntryComponent,    
 ],
 schemas: [
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA
],
  providers: [AuthGuard, AuthCheckService, AuthService, MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor() {
    console.log('AppModule loaded.');
  }
}
