import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromModalDialogControl from './modal-dialog-control.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ModalDialogControlEffects } from './modal-dialog-control.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromModalDialogControl.modalDialogControlsFeatureKey,
      fromModalDialogControl.reducer
    ),
    EffectsModule.forFeature([ModalDialogControlEffects]),
  ],
})
export class ModalDialogControlStoreModule {}
