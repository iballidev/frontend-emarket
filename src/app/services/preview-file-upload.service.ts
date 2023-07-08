import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { previewFileUrl } from '../config/api';
import { PreviewFileUpload } from '../models/interfaces/preview-file-upload';

@Injectable({
  providedIn: 'root',
})
export class PreviewFileUploadService {
  constructor(private _http: HttpClient) {}

  uploadFile(Payload: any) {
    const formData = new FormData();
    for (let prop in Payload) {
      formData.append(prop, Payload[prop]);
    }
    console.log('formData: ', formData);
    return this._http.post(previewFileUrl + '/' + Payload.createdBy, formData);
  }
}
