import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.scss'],
})
export class UpdateTodoComponent implements OnInit, AfterContentInit {
  @Input() description!: any;
  @Input() data!: any;
  model: any = {};
  validationError!: boolean;
  updateTodoForm!: FormGroup;
  userProfileId: any;
  todo: any;

  constructor(
    public activeModal: NgbActiveModal,
    private _userProfileSvc: UserProfileService,
    private _todoSvc: TodoService,
    private _fb: FormBuilder,
    private store: Store<TodoState>
  ) {}

  ngOnInit(): void {
    this.todo = this.data;
    this.getUserProfile();

    /**Closes the modal is set to true */
    this._todoSvc.modalComponentSubj.subscribe((data: boolean) => {
      if (data) {
        this.activeModal.dismiss('update todo modal closed!');
        this.activeModal.close('Close click');
      }
    });

    
    /**Set errors */
    this._todoSvc.setFormErrorSubj.subscribe((data: any) => {
      if (data) {
        this.updateTodoForm.setErrors(data);
      }
    });

  }

  ngAfterContentInit(): void {
    this.prefillForm();
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (data: any) => {
        this.userProfileId = data.profile._id;
      },
    });
  }

  prefillForm() {
    let obj: any = {};
    for (const key in this.todo) {
      // if (Object.prototype.hasOwnProperty.call(this.todo, key)) {
      // this.model[`${key}`] = this.todo[key];
      // console.log(this.model[`${key}`] + ": "+ this.model[key])
      // }

      if (key === 'title' || key === 'description') {
        obj[`${key}`] = this.todo[key];
      }
    }
    this.model = { ...obj };
    // this.model.Title = this.todo.title;
    // this.model.Description = this.todo.description;
  }

  updateTodo() {
    const todo = {
      title: this.model.title,
      description: this.model.description,
    };

    let payload = {
      todoId: this.todo._id,
      todo: todo,
      userProfileId: this.userProfileId,
    };

    this.store.dispatch(fromTodoActions.updateTodo({ payload }));

    // this._todoSvc
    //   .updateTodo(payload)

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
    //         return this.updateTodoForm.setErrors(err.OriginalError);
    //       else throw err;
    //     },
    //   });
  }

  modalComponent() {
    this.store.dispatch(fromTodoActions.closeUpdateTodoModal());
  }
}
