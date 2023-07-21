import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromTodo from './store/todo.reducer';
import { TodoComponent } from './todo.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { FormsModule } from '@angular/forms';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { EffectsModule } from '@ngrx/effects';
import { TodoEffects } from './store/todo.effects';


@NgModule({
  declarations: [
    TodoComponent,
    AddTodoComponent,
    UpdateTodoComponent
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    StoreModule.forFeature(fromTodo.todosFeatureKey, fromTodo.reducer),
    SharedModule,
    FormsModule,
    EffectsModule.forFeature([TodoEffects]),
  ]
})
export class TodoModule { }
