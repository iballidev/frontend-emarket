import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Todo } from './todo.model';

/** LOAD TODOS BEGINS */
export const loadTodos = createAction(
  '[Todo Component] Load Todos',
  props<{ userProfileId: any }>()
);

export const loadTodosSuccess = createAction(
  '[Todo Load Effect] Load Todos Success',
  props<{ todos: Todo[] }>()
);

export const loadTodosFailure = createAction(
  '[Todo Load Effect] Load Todos Failure',
  props<{ error: any }>()
);
/** LOAD TODOS ENDS */

/** ADD TODOS BEGINS */
export const addTodo = createAction(
  '[Add Todo Component] Add Todo',
  props<{ todo: Todo }>()
);

export const addTodoSuccess = createAction(
  '[Add Effect] Add Todo Success',
  props<{ todo: Todo }>()
);

export const addTodoFailure = createAction(
  '[Add Effect] Add Todo Failure',
  props<{ error: any }>()
);
/** ADD TODOS ENDS */

/** UPDATE TODOS BEGINS */
export const updateTodo = createAction(
  '[Update Todo Component] Update Todo',
  props<{ payload: any }>()
);

export const updateTodoSuccess = createAction(
  '[Update Effect] Update Todo',
  props<{ todo: Update<Todo> }>()
);

export const updateTodoFailure = createAction(
  '[Update Effect] Update Todo',
  props<{ error: any }>()
);

/** UPDATE TODOS ENDS */

/** DELETE TODO ENDS */
export const deleteTodo = createAction(
  '[Todo Component] Delete Todo',
  props<{ id: string }>()
);

export const deleteTodoSuccess = createAction(
  '[Todo Component] Delete Todo Success ',
  props<{ id: string }>()
);

export const deleteTodoFailure = createAction(
  '[Todo Component] Delete Todo Failure  ',
  props<{ error: any }>()
);
/** DELETE TODO ENDS */

/** OPEN DIALOG UPDATE TODO MODAL */
export const openUpdateTodoModal = createAction(
  '[Todo Component] Open Update Todo Modal',
  // props<{ isOpenUpdateDialog: boolean }>()
  props<{ todo: any }>()
);
export const openUpdateTodoModalSuccess = createAction(
  '[OpenUpdateDialog Effect] Open Update Todo Modal Success',
  props<{ isOpenUpdateDialog: boolean }>()
);
export const openUpdateTodoModalFailure = createAction(
  '[OpenUpdateDialog Effect] Open Update Todo Modal Failure',
  props<{ error: any }>()
);

/** CLOSE DIALOG UPDATE TODO MODAL */
export const closeUpdateTodoModal = createAction(
  '[Todo Component] Close Update Todo Modal'
);
export const closeUpdateTodoModalSuccess = createAction(
  '[CloseUpdateDialog Effect] Close Update Todo Modal Success',
  props<{ isOpenUpdateDialog: boolean }>()
);
export const closeUpdateTodoModalFailure = createAction(
  '[CloseUpdateDialog Effect] Close Update Todo Modal Failure',
  props<{ error: any }>()
);

/** CLOSE DIALOG UPDATE TODO MODAL */
// export const closeUpdateTodoModal = createAction(
//   '[OpenUpdateDialog Effect] Delete Todo',
//   props<{ isOpenUpdateDialog: boolean }>()
// );

// export const loadTodos = createAction(
//   '[Todo/API] Load Todos',
//   props<{ todos: Todo[] }>()
// );

// export const addTodo = createAction(
//   '[Todo/API] Add Todo',
//   props<{ todo: Todo }>()
// );

// export const upsertTodo = createAction(
//   '[Todo/API] Upsert Todo',
//   props<{ todo: Todo }>()
// );

// export const addTodos = createAction(
//   '[Todo/API] Add Todos',
//   props<{ todos: Todo[] }>()
// );

// export const upsertTodos = createAction(
//   '[Todo/API] Upsert Todos',
//   props<{ todos: Todo[] }>()
// );

// export const updateTodo = createAction(
//   '[Todo/API] Update Todo',
//   props<{ todo: Update<Todo> }>()
// );

// export const updateTodos = createAction(
//   '[Todo/API] Update Todos',
//   props<{ todos: Update<Todo>[] }>()
// );

// export const deleteTodo = createAction(
//   '[Todo/API] Delete Todo',
//   props<{ id: string }>()
// );

// export const deleteTodos = createAction(
//   '[Todo/API] Delete Todos',
//   props<{ ids: string[] }>()
// );

// export const clearTodos = createAction(
//   '[Todo/API] Clear Todos'
// );
