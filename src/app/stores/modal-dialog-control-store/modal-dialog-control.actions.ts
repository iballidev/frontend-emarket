import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { ModalDialogControl } from './modal-dialog-control.model';

/** OPEN DIALOG MODAL */
export const openModal = createAction(
  '[OpenDialog Effect] Open  Modal',
  props<{ modalComponent: any }>()
);

export const openModalSuccess = createAction(
  '[OpenDialog Effect] Open  Modal Success',
  props<{ isOpenModal: boolean }>()
);
export const openModalFailure = createAction(
  '[OpenDialog Effect] Open  Modal Failure',
  props<{ error: any }>()
);

/** CLOSE DIALOG MODAL */
export const closeModal = createAction(' Component] Close  Modal');
export const closeModalSuccess = createAction(
  '[CloseDialog Effect] Close  Modal Success',
  props<{ isOpenModal: boolean }>()
);
export const closeModalFailure = createAction(
  '[CloseDialog Effect] Close  Modal Failure',
  props<{ error: any }>()
);
