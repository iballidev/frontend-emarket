import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { TodoService } from '../services/todo.service';
import { AppError } from 'src/app/common/app-error';
import { BadInputError } from 'src/app/common/bad-input-error';
import { Store } from '@ngrx/store';
import { TodoState } from '../store/todo.reducer';
import * as fromTodoActions from '../store/todo.actions';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  @Input() description!: any;
  model: any = {};
  validationError!: boolean;
  createTodoForm!: FormGroup;
  userProfileId: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _userProfileSvc: UserProfileService,
    private _todoSvc: TodoService,
    private _fb: FormBuilder,
    private store: Store<TodoState>
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
  }
  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (data: any) => {
        this.userProfileId = data.profile._id;
      },
    });
  }

  createTodo() {
    const todo = {
      title: this.model.Title,
      description: this.model.Description,
    };

    let payload = {
      todo: todo,
      userProfileId: this.userProfileId,
    };

    this.store.dispatch(fromTodoActions.addTodo(payload));

    // this._todoSvc
    //   .createTodo(payload)

    //   .subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //         // console.log('response: ', response);
    //         this.activeModal.dismiss('hello');
    //       }
    //     },
    //     error: (err: AppError) => {
    //       console.log('Error: ', err);
    //       if (err instanceof BadInputError)
    //         return this.createTodoForm.setErrors(err.OriginalError);
    //       else throw err;
    //     },
    //   });
  }
}
