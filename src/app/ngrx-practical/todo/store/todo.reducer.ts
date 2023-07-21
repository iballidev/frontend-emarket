import { Action, createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Todo } from './todo.model';
import * as TodoActions from './todo.actions';
import { state } from '@angular/animations';

export const todosFeatureKey = 'todos';

export interface TodoState extends EntityState<Todo> {
  // additional entities state properties

  error: any;
  isLoading: boolean;
  isOpenUpdateDialog: boolean;
}

export const adapter: EntityAdapter<Todo> = createEntityAdapter<Todo>();

export const initialState: TodoState = adapter.getInitialState({
  // additional entity state properties

  error: undefined,
  isLoading: false,
  isOpenUpdateDialog: false,
});

export const reducer = createReducer(
  initialState,
  /**  LOAD TODO LIST */
  on(TodoActions.loadTodosFailure, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.loadTodosSuccess, (state, action) =>
    adapter.setAll(action.todos, state)
  ),
  on(TodoActions.loadTodosSuccess, (state, action) => {
    return { ...state, isLoading: false };
  }),
  on(TodoActions.loadTodosFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /**  ADD TODO LIST */
  on(TodoActions.addTodo, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.addTodoSuccess, (state, action) =>
    adapter.addOne(action.todo, state)
  ),
  on(TodoActions.addTodoSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(TodoActions.addTodoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /**  UPDATE TODO LIST */
  on(TodoActions.updateTodo, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.updateTodoSuccess, (state, action) =>
    adapter.updateOne(action.todo, state)
  ),
  on(TodoActions.updateTodoSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(TodoActions.updateTodoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /** DELETE TODO ENDS */
  on(TodoActions.deleteTodo, (state, action) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(TodoActions.deleteTodoSuccess, (state, action) =>
    adapter.removeOne(action.id, state)
  ),
  on(TodoActions.deleteTodoSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
    };
  }),
  on(TodoActions.deleteTodoFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      isLoading: false,
    };
  }),

  /** OPEN DIALOG UPDATE TODO MODAL */
  // on(TodoActions.openUpdateTodoModal, (state, action) => {
  //   return {
  //     ...state,
  //     isOpenUpdateDialog: false,
  //   };
  // }),
  on(TodoActions.openUpdateTodoModalSuccess, (state, action) => {
    return {
      ...state,
      isOpenUpdateDialog: true,
    };
  }),
  on(TodoActions.openUpdateTodoModalFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  }),

  /** CLOSE DIALOG UPDATE TODO MODAL */
  on(TodoActions.closeUpdateTodoModalSuccess, (state, action) => {
    return {
      ...state,
      isOpenUpdateDialog: false,
    };
  }),
  on(TodoActions.closeUpdateTodoModalFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
    };
  })
  // on(TodoActions.closeUpdateTodoModal, (state, action) => {
  //   return {
  //     ...state,
  //     isOpenUpdateDialog: false,
  //   };
  // })

  // on(TodoActions.addTodo,
  //   (state, action) => adapter.addOne(action.todo, state)
  // ),
  // on(TodoActions.upsertTodo,
  //   (state, action) => adapter.upsertOne(action.todo, state)
  // ),
  // on(TodoActions.addTodos,
  //   (state, action) => adapter.addMany(action.todos, state)
  // ),
  // on(TodoActions.upsertTodos,
  //   (state, action) => adapter.upsertMany(action.todos, state)
  // ),
  // on(TodoActions.updateTodo,
  //   (state, action) => adapter.updateOne(action.todo, state)
  // ),
  // on(TodoActions.updateTodos,
  //   (state, action) => adapter.updateMany(action.todos, state)
  // ),
  // on(TodoActions.deleteTodo,
  //   (state, action) => adapter.removeOne(action.id, state)
  // ),
  // on(TodoActions.deleteTodos,
  //   (state, action) => adapter.removeMany(action.ids, state)
  // ),
  // on(TodoActions.loadTodos,
  //   (state, action) => adapter.setAll(action.todos, state)
  // ),
  // on(TodoActions.clearTodos,
  //   state => adapter.removeAll(state)
  // ),
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  adapter.getSelectors();
