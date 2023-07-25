import { Injectable } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalDialogControlService {
  public modalComponentSubj: Subject<any> = new Subject<any>();
  public setFormErrorSubj: Subject<any> = new Subject<any>();

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {}

  openModalComponent(component: any, data?: any) {
    const modalRef = this.modalService.open(component, {
      centered: true,
    });
    modalRef.componentInstance.data = data;
    this.modalComponentSubj.next(true);
  }

  closeModalComponent(close: boolean) {
    this.modalComponentSubj.next(close);
  }
}
