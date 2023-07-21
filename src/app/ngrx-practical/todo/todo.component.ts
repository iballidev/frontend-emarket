import { Component, OnInit } from '@angular/core';
import { TodoService } from './services/todo.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { UpdateTodoComponent } from './update-todo/update-todo.component';
import { Store, select } from '@ngrx/store';
import { TodoState } from './store/todo.reducer';
import * as fromTodoActions from '../todo/store/todo.actions';
import { selectTodos } from './store/todo.selectors';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  userProfileId: any;
  todoList: any;
  btnTitle: string = 'Add todo';
  btnType: string = 'submit';
  todoList$: any;
  constructor(
    private _todoSvc: TodoService,
    private _userProfileSvc: UserProfileService,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private store: Store<TodoState>
  ) {}

  ngOnInit(): void {
    this.getUserProfile();

    this.modalService.activeInstances.subscribe((modalList) => {
      if (!modalList.length) this.getAllTodosByProfileId();
    });

    this.todoList$ = this.store.pipe(select(selectTodos));
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        if (response) {
          this.userProfileId = response?.profile._id;
          if (this.userProfileId) this.getAllTodosByProfileId();
        }
      },
    });
  }

  getAllTodosByProfileId() {
    this.store.dispatch(
      fromTodoActions.loadTodos({ userProfileId: this.userProfileId })
    );
    // this._todoSvc.getAllTodosByProfileId(this.userProfileId).subscribe({
    //   next: (response: any) => {
    //     this.todoList = response.todos;
    //   },
    //   error: (error: any) => {
    //     console.log('error: ', error);
    //   },
    // });
  }

  AddTodo($event: boolean) {
    if ($event) {
      this._todoSvc.openAddTodoModal();
    }
  }

  UpdateTodo(todo: string) {
    if (todo) {
      // this._todoSvc.openUpdateTodoModal(todo);
      this.store.dispatch(fromTodoActions.openUpdateTodoModal({ todo }));
    }
  }

  onDeleteTodo(todoId: string) {
    this.store.dispatch(fromTodoActions.deleteTodo({ id: todoId }));
    // this._todoSvc.deleteByResource(todoId).subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       console.log('response: ', response);
    //       this.getAllTodosByProfileId();
    //     }
    //   },
    //   error: (error: any) => {
    //     if (error) {
    //       console.log('error: ', error);
    //     }
    //   },
    // });
  }
}
