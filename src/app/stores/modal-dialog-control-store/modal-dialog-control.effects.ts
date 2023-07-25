import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as fromModalDialogControlActions from './modal-dialog-control.actions';
import { map } from 'rxjs';
import { ModalDialogControlService } from 'src/app/services/modal-dialog-control.service';

@Injectable()
export class ModalDialogControlEffects {
  openModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromModalDialogControlActions.openModal),
      map((action: any) => {
        console.log('action: ', action);
        this._modalDialogSvc.openModalComponent(
          action.modalComponent._component,
          action.modalComponent.message
          // action.component,
          // action.message
        );
        return fromModalDialogControlActions.openModalSuccess({
          isOpenModal: true,
        });
      })
    );
  });

  closeModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromModalDialogControlActions.closeModal),
      map((action) => {
        this._modalDialogSvc.closeModalComponent(true);
        return fromModalDialogControlActions.closeModalSuccess({
          isOpenModal: false,
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private _modalDialogSvc: ModalDialogControlService
  ) {}
}
