import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ModalDialogControl } from './modal-dialog-control.model';
import * as ModalDialogControlActions from './modal-dialog-control.actions';
import * as fromModalDialogControlActions from './modal-dialog-control.actions';

export const modalDialogControlsFeatureKey = 'modalDialogControls';

export interface State extends EntityState<ModalDialogControl> {
  // additional entities state properties
}

export const adapter: EntityAdapter<ModalDialogControl> =
  createEntityAdapter<ModalDialogControl>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export const reducer = createReducer(
  initialState,

  /** OPEN DIALOG ADD TODO MODAL */
  on(fromModalDialogControlActions.openModal, (state, action) => {
    return {
      ...state,
    };
  }),
  on(fromModalDialogControlActions.openModalSuccess, (state, action) => {
    return {
      ...state,
      isOpenModal: action.isOpenModal,
    };
  }),
  on(fromModalDialogControlActions.openModalFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  /** CLOSE DIALOG ADD TODO MODAL */
  on(fromModalDialogControlActions.closeModal, (state, action) => {
    return {
      ...state,
    };
  }),
  on(fromModalDialogControlActions.closeModalSuccess, (state, action) => {
    return {
      ...state,
      isOpenModal: action.isOpenModal,
    };
  }),
  on(fromModalDialogControlActions.closeModalFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })

);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
