import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { IconsModule } from '../icons/icons.module';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [CommonModule, SharedRoutingModule, NgBootstrapModule, IconsModule],
  exports: [ToolbarComponent],
})
export class SharedModule {}
