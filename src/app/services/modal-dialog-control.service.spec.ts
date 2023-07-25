import { TestBed } from '@angular/core/testing';

import { ModalDialogControlService } from './modal-dialog-control.service';

describe('ModalDialogControlService', () => {
  let service: ModalDialogControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalDialogControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
