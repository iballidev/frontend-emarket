import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AppError } from '../../common/app-error';
import { handleError } from '../../common/handleError';

// @Injectable({
//   providedIn: 'root',
// })

export class DataService {
  constructor(private url: string, private http: HttpClient) {}

  getAll(resource?: any): Observable<any> {
    if (resource) {
      return this.http.get<any>(this.url + resource).pipe(
        map((response: any) => {
          console.log('map response: ', response);
          return response;
        }),
        catchError((err: Response) => {
          return throwError(() => new AppError(err));
        })
      );
    } else {
      return this.http.get<any>(this.url).pipe(
        map((response: any) => {
          console.log('map response: ', response);
          return response;
        }),
        catchError((err: Response) => {
          return throwError(() => new AppError(err));
        })
      );
    }
  }

  getByResource(resource?: any) {
    return this.http
      .get<any>(`${this.url}/${resource}`)
      .pipe(catchError(handleError));
  }

  create(resource: any) {
    return this.http.post(this.url, resource).pipe(catchError(handleError));
  }

  update(resource: any) {
    return this.http.patch(this.url + '/' + resource.id, resource.payload).pipe(
      map((response) => response),
      catchError(handleError)
    );
  }

  deleteByResource(id: string) {
    return this.http.delete(this.url + '/' + id).pipe(
      map((response) => response),
      catchError(handleError)
    );
  }
}
