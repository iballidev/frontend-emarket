import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import * as fromTodoActions from './todo.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TodoState } from './todo.reducer';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.loadTodos),
      mergeMap((action: any) => {
        console.log('action: ', action);
        return this._todoSvc.getAllTodosByProfileId(action.userProfileId).pipe(
          map((response: any) => {
            console.group('todos effect: ', response);
            let todos = response.todos.map((todo: any) => {
              return {
                ...todo,
                id: todo._id,
              };
            });
            console.log('todos effect: ', todos);
            return fromTodoActions.loadTodosSuccess({ todos });
          }),
          catchError((error: any) =>
            of(fromTodoActions.loadTodosFailure({ error }))
          )
        );
      }),
      tap(() => this._router.navigate(['ngrx-practicals']))
    );
  });

  addTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.addTodo),
      mergeMap((payload: any) =>
        this._todoSvc.createTodo(payload).pipe(
          map((data: any) => {
            console.log('data: ', data);
            let item = {
              ...data.todo,
              id: data.todo._id,
            };
            console.log('item: ', item);
            return fromTodoActions.addTodoSuccess({ todo: item });
          }),
          catchError((error) => of(fromTodoActions.addTodoFailure({ error }))),
          tap(($event) => {
            console.log('$event: ', $event);
          })
        )
      )
    );
  });

  updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.updateTodo),
      mergeMap((payload: any) => {
        console.log('payload: ', payload);
        return this._todoSvc.updateTodo(payload.payload).pipe(
          map((data: any) => {
            console.log('data: ', data);
            let item = {
              ...data.todo,
              id: data.todo._id,
            };
            console.log('item: ', item);
            return fromTodoActions.updateTodoSuccess({ todo: item });
          }),
          catchError((error) =>
            of(fromTodoActions.updateTodoFailure({ error }))
          ),
          tap(($response) => {
            if ($response) {
              console.log('$response: ', $response);
              // this.activeModal.dismiss('hello');
              // this.activeModal.dismiss('hello');
              // this.closeUpdateTodoModal$

              // this.store.dispatch(fromTodoActions.closeUpdateTodoModal());

              this._todoSvc.closeUpdateTodoModal(true);
              fromTodoActions.closeUpdateTodoModalSuccess({
                isOpenUpdateDialog: false,
              });
              console.log('this.activeModal: ', this.activeModal);
            }
          })
        );
      })
    );
  });

  deleteTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.deleteTodo),
      mergeMap((payload) =>
        this._todoSvc.deleteByResource(payload.id).pipe(
          map((data) => fromTodoActions.deleteTodoSuccess({ id: payload.id })),
          catchError((error) =>
            of(fromTodoActions.deleteTodoFailure({ error }))
          )
        )
      )
    );
  });

  openUpdateTodoModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.openUpdateTodoModal),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      // operator(() => EMPTY));
      map((action) => {
        console.log('action: ', action);
        // Simulate the asynchronous operation here (e.g., a delay or other logic)
        // const simulatedData = { message: 'Simulated data from effect!' };
        this._todoSvc.openUpdateTodoModal(action.todo);
        return fromTodoActions.openUpdateTodoModalSuccess({
          isOpenUpdateDialog: true,
        });
      })
    );
  });

  closeUpdateTodoModal$ = createEffect(() => {
    console.log('closeUpdateTodoModal$');
    return this.actions$.pipe(
      ofType(fromTodoActions.closeUpdateTodoModal),
      /** An EMPTY observable only emits completion. Replace with your own observable stream */
      // operator(() => EMPTY));
      map((action) => {
        console.log('action: ', action);
        // Simulate the asynchronous operation here (e.g., a delay or other logic)
        // const simulatedData = { message: 'Simulated data from effect!' };
        // this._todoSvc.closeUpdateTodoModal(true);
        return fromTodoActions.closeUpdateTodoModalSuccess({
          isOpenUpdateDialog: false,
        });
      })
    );
  });

  constructor(
    private activeModal: NgbActiveModal,
    private actions$: Actions,
    private _todoSvc: TodoService,
    private _router: Router,
    private store: Store<TodoState>
  ) {}
}
