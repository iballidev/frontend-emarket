import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../components/toolbar/toolbar.component';
import { SharedRoutingModule } from './shared-routing.module';
import { NgBootstrapModule } from '../ng-bootstrap/ng-bootstrap.module';
import { IconsModule } from '../icons/icons.module';
import { ModalTriggerButtonComponent } from './components/modal-trigger-button/modal-trigger-button.component';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { ModalDialogControlStoreModule } from '../stores/modal-dialog-control-store/modal-dialog-control-store.module';

@NgModule({
  declarations: [ToolbarComponent, ModalTriggerButtonComponent],
  imports: [
    CommonModule,
    SharedRoutingModule,
    NgBootstrapModule,
    IconsModule,
    NgxPaginationModule,
    ModalDialogControlStoreModule,
  ],
  exports: [
    ToolbarComponent,
    ModalTriggerButtonComponent,
    NgxPaginationModule,
    NgBootstrapModule,
    ModalDialogControlStoreModule,
  ],
})
export class SharedModule {}
