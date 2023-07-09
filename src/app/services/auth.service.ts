import { Injectable } from '@angular/core';
import { authUrl, logoutUrl, refreshTokenUrl } from '../config/api';
import { HttpClient } from '@angular/common/http';
import { LoginUser, SignupUser } from '../models/interfaces/user';
import { Observable, catchError, map, throwError } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, Router } from '@angular/router';
import { AppError } from '../common/app-error';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUrl = `${authUrl}`;
  signupUrl = `${authUrl}/signup`;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  // const err = new Error('test'); throwError(() => err);.
  SignupUser(payload: SignupUser) {
    return this.http
      .post(this.signupUrl, payload)
      .pipe(catchError((err: Response) => throwError(() => new AppError(err))));
  }

  LoginUser(payload: LoginUser) {
    return this.http.post(this.authUrl, payload).pipe(
      map((response: any) => {
        // console.log('response svc: ', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
          // console.group('returnUrl: ', returnUrl);
          this.router.navigate([returnUrl || '/']);
          // return true;
        }
        // return false;
      })
    );
  }

  isLoggedIn() {
    var token: any = localStorage.getItem('token');
    if (!token) return false;
    var decoded: any = jwt_decode(token);
    // console.log(decoded);

    if (decoded.exp * 1000 < new Date().getTime()) {
      // console.log('Time Expired');
      return false;
    }
    return true;
  }

  get getToken() {
    var token: any = localStorage.getItem('token');
    return token || null;
  }

  get currentUser() {
    var token: any = localStorage.getItem('token');
    if (!token) return null;
    var decoded: any = jwt_decode(token);
    if (decoded.exp * 1000 < new Date().getTime()) return null;
    return decoded.userInfo;
  }

  LogoutUser() {
    this.http.get(logoutUrl).subscribe({
      next: () => {},
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
    if (localStorage.getItem('token')) localStorage.removeItem('token');
    this.router.navigate(['/app/auth']);
  }

  get RefreshToken() {
    return this.http.get(refreshTokenUrl).pipe(
      map((response: any) => {
        console.log('response svc: ', response);
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          return response.token;
        } else {
          return null;
        }
      })
    );
    // return this.http
    //   .post<UserModel>(this.RefreshTokenUrl, {
    //     refreshtoken,
    //   })
    //   .pipe(
    //     map((UserModel) => {
    //       console.log('NEW DATA UserModel: ', UserModel);
    //       localStorage.setItem('token', 'null');
    //       this.setToken(UserModel.AccessToken);
    //       localStorage.setItem('RefreshToken', UserModel.RefreshToken);
    //       return UserModel.AccessToken;
    //     })
    //   );
  }
}
