import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  Observable,
  catchError,
  filter,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private IsRefreshing = false;
  private RefreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(private _authSvc: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.warn('this._authSvc.isLoggedIn(): ', this._authSvc.isLoggedIn());
    if (this._authSvc.isLoggedIn()) {
      const token: any = this._authSvc.getToken;
      console.log('token: ', token);
      request = this.AddToken(request, token);
    }
    return next.handle(request).pipe(
      tap((event: any) => {
        console.log('event: ', event);
      }),
      catchError((err) => {
        console.log('Error', err);
        if (
          err instanceof HttpErrorResponse &&
          (err.status === 401 || err.status === 400)
        ) {
          console.warn('status: ', err?.status);
          return this.Handle401Error(request, next);
        }
        return throwError(() => err);
      })
    );
  }

  AddToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private Handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.IsRefreshing) {
      this.IsRefreshing = true;
      this.RefreshTokenSubject.next(null);

      /**Testing: switchMap tutorial https://www.tektutorialshub.com/angular/using-switchmap-in-angular/#:~:text=The%20Angular%20SwitchMap%20maps%20each,it%20receives%20from%20the%20Source. */
      let x = this._authSvc.RefreshToken.pipe(
        switchMap((token: any) => {
          console.warn('new token: ', token);
          this.IsRefreshing = false;
          this.RefreshTokenSubject.next(token);
          return next.handle(this.AddToken(request, token));
        })
      );

      x.subscribe((x2: any) => console.log('x2: ', x2));
      /** */

      return this._authSvc.RefreshToken.pipe(
        switchMap((token: any) => {
          console.warn('new token: ', token);
          this.IsRefreshing = false;
          this.RefreshTokenSubject.next(token);
          return next.handle(this.AddToken(request, token));
        })
      );
    } else {
      return this.RefreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt: any) => {
          return next.handle(this.AddToken(request, jwt));
        })
      );
    }
  }
}
