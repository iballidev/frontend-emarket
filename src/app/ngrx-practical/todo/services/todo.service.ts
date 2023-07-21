import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, catchError } from 'rxjs';
import { handleError } from 'src/app/common/handleError';
import { todoUrl } from 'src/app/config/api';
import { DataService } from 'src/app/services/data/data.service';
import { UpdateTodoComponent } from '../update-todo/update-todo.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';

@Injectable({
  providedIn: 'root',
})
export class TodoService extends DataService {
  public closeUpdateTodoModalSubj: Subject<any> = new Subject<any>();
  userProfile: any;

  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    super(todoUrl, _http);
  }

  createTodo(Payload: any) {
    console.log('payload: ', Payload);
    return this._http.post(
      `${todoUrl}/create-todo-by-profile-id/${Payload.userProfileId}`,
      Payload.todo
    );
  }

  getAllTodosByProfileId(userProfileId: string): Observable<any> {
    let resource = '/get-all-todos-by-profile-id/' + userProfileId;
    return this.getAll(resource);
  }

  updateTodo(Payload: any) {
    return this._http.put(
      `${todoUrl}/update-todo-by-todo-id-and-profile-id/${Payload.todoId}/${Payload.userProfileId}`,
      Payload.todo
    );
  }

  deleteTodo(TodoId: string) {
    return this.deleteByResource(TodoId);
  }

  openUpdateTodoModal(todo: any) {
    const modalRef = this.modalService.open(UpdateTodoComponent, {
      centered: true,
    });
    // const modalRef = this.modalService.open(UpdateTodoComponent, { fullscreen: true });
    modalRef.componentInstance.todo = todo;
  }

  closeUpdateTodoModal(data:boolean) {
    // this.activeModal.dismiss('update todo modal closed!');
    this.closeUpdateTodoModalSubj.next(data)
  }

  openAddTodoModal() {
    const modalRef = this.modalService.open(AddTodoComponent, {
      centered: true,
    });
    // const modalRef = this.modalService.open(AddTodoComponent, { fullscreen: true });
    modalRef.componentInstance.description = 'Create a new todo';
  }
}
