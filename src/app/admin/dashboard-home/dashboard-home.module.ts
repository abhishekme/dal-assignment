import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RouterModule } from '@angular/router';
import { PartialModule } from '../../partial/partial.module';

import { dashboardRoutes } from './dashboard-home.routes';

@NgModule({
  imports: [
    CommonModule,
    PartialModule,
    RouterModule.forChild(dashboardRoutes)
  ],
  declarations: [
    DashboardHomeComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  exports: [
    RouterModule
  ]
})
export class DashboardHomeModule {
  constructor() {
    console.log('DashboardLazyModule loaded.');
  }
}
