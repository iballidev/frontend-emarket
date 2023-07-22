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
  // public closeUpdateTodoModalSubj: Subject<any> = new Subject<any>();
  public modalComponentSubj: Subject<any> = new Subject<any>();
  userProfile: any;
  public setFormErrorSubj: Subject<any> = new Subject<any>();

  constructor(
    private _http: HttpClient,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    super(todoUrl, _http);
  }

  sendFormErrorMsg(msg:any){
    this.setFormErrorSubj.next(msg)
  }

  createTodo(Payload: any) {
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

  openModalComponent(component: any, data?: any) {
    const modalRef = this.modalService.open(component, {
      centered: true,
      // fullscreen: true
    });
    modalRef.componentInstance.data = data;
    this.modalComponentSubj.next(true);
  }

  closeModalComponent(close: boolean) {
    this.modalComponentSubj.next(close);
  }
}
