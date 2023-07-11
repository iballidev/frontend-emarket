import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UiDesignRoutingModule } from './ui-design-routing.module';
import { UiDesignComponent } from './ui-design.component';


@NgModule({
  declarations: [
    UiDesignComponent
  ],
  imports: [
    CommonModule,
    UiDesignRoutingModule
  ]
})
export class UiDesignModule { }
