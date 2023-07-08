import { TestBed } from '@angular/core/testing';

import { PreviewFileUploadService } from './preview-file-upload.service';

describe('PreviewFileUploadService', () => {
  let service: PreviewFileUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PreviewFileUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
