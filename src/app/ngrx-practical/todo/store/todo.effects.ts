import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TodoService } from '../services/todo.service';
import { Router } from '@angular/router';
import * as fromTodoActions from './todo.actions';
import { catchError, map, mergeMap, of, tap, throwError } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TodoState } from './todo.reducer';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';
import { BadInputError } from 'src/app/common/bad-input-error';

@Injectable()
export class TodoEffects {
  loadTodos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.loadTodos),
      mergeMap((action: any) => {
        return this._todoSvc.getAllTodosByProfileId(action.userProfileId).pipe(
          map((response: any) => {
            let todos = response.todos.map((todo: any) => {
              return {
                ...todo,
                id: todo._id,
              };
            });
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
            let item = {
              ...data.todo,
              id: data.todo._id,
            };
            return fromTodoActions.addTodoSuccess({ todo: item });
          }),
          catchError((error) => of(fromTodoActions.addTodoFailure({ error }))),
          catchError((err) => {
            if (err instanceof BadInputError)
              this._todoSvc.sendFormErrorMsg(err.OriginalError);
            else throw err;

            return throwError(() => err);
          }),
          tap(($event) => {
            this._todoSvc.closeModalComponent(true);
            return fromTodoActions.closeUpdateTodoModalSuccess({
              isOpenComponentModal: false,
            });
          })
        )
      )
    );
  });

  updateTodo$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.updateTodo),
      mergeMap((payload: any) => {
        return this._todoSvc.updateTodo(payload.payload).pipe(
          map((data: any) => {
            let item = {
              ...data.todo,
              id: data.todo._id,
            };
            return fromTodoActions.updateTodoSuccess({ todo: item });
          }),
          catchError((error) =>
            of(fromTodoActions.updateTodoFailure({ error }))
          ),
          catchError((err) => {
            if (err instanceof BadInputError)
              this._todoSvc.sendFormErrorMsg(err.OriginalError);
            else throw err;

            return throwError(() => err);
          }),
          tap(($response) => {
            if ($response) {
              this._todoSvc.closeModalComponent(true);
              fromTodoActions.closeUpdateTodoModalSuccess({
                isOpenComponentModal: false,
              });
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
        this._todoSvc.openModalComponent(UpdateTodoComponent, action.todo);
        return fromTodoActions.openUpdateTodoModalSuccess({
          isOpenComponentModal: true,
        });
      })
    );
  });

  closeUpdateTodoModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.closeUpdateTodoModal),
      map((action) => {
        this._todoSvc.closeModalComponent(true);
        return fromTodoActions.closeUpdateTodoModalSuccess({
          isOpenComponentModal: false,
        });
      })
    );
  });

  openAddTodoModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.openAddTodoModal),
      map((action) => {
        this._todoSvc.openModalComponent(AddTodoComponent, 'Create a new todo');
        return fromTodoActions.openAddTodoModalSuccess({
          isOpenComponentModal: true,
        });
      })
    );
  });

  closeAddTodoModal$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fromTodoActions.closeAddTodoModal),
      map((action) => {
        this._todoSvc.closeModalComponent(true);
        return fromTodoActions.closeAddTodoModalSuccess({
          isOpenComponentModal: false,
        });
      })
    );
  });

  constructor(
    private actions$: Actions,
    private _todoSvc: TodoService,
    private _router: Router
  ) {}
}
