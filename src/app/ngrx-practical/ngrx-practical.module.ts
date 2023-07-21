import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgrxPracticalRoutingModule } from './ngrx-practical-routing.module';
import { NgrxPracticalComponent } from './ngrx-practical.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    NgrxPracticalComponent
  ],
  imports: [
    CommonModule,
    NgrxPracticalRoutingModule,
    SharedModule
  ]
})
export class NgrxPracticalModule { }
