import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list/product-list.component';

import { productRoutes } from './product.routes';
import { RouterModule } from '@angular/router';
import { PartialModule } from '../../partial/partial.module';
import { ProductComponent } from './product.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NglModule } from 'ng-lightning/ng-lightning';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { ToastrModule } from 'ng6-toastr-notifications';


@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    Ng2ImgMaxModule,
    Ng4LoadingSpinnerModule.forRoot(),
    FlashMessagesModule.forRoot(),
    RouterModule.forChild(productRoutes),
    SimpleNotificationsModule.forRoot(),
    ToastrModule.forRoot()
  ],
  declarations: [
    ProductListComponent,
    ProductComponent,
    //GridCreatorComponent,
  ],
  exports: [
    RouterModule
  ]
})
export class ProductModule {
  constructor() {
    console.log('ProductModule loaded.');
  }

}
