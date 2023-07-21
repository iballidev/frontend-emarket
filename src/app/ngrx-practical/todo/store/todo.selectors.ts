import { createFeatureSelector, createSelector } from '@ngrx/store';
import { todosFeatureKey, TodoState, selectAll, adapter } from './todo.reducer';

export const selectTodoState =
  createFeatureSelector<TodoState>(todosFeatureKey);

export const selectTodos = createSelector(selectTodoState, selectAll);
export const selectedTodo = createSelector(
  selectTodoState,
  adapter.getSelectors().selectAll
);

export const selectedError = createSelector(
  selectTodoState,
  (state: TodoState) => state.error
);
