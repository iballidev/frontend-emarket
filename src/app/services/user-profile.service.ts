import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userProfileUrl } from '../config/api';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService extends DataService {
  currentUser: any;
  constructor(
    private _http: HttpClient,
    private _authSvc: AuthService,
    private router: Router
  ) {
    super(userProfileUrl, _http);
    
    this.currentUser = this._authSvc.currentUser;
    if (!this.currentUser) this.router.navigate(['/']);
  }

  getUserProfile(): Observable<any> {
    return this._http.get<any>(userProfileUrl + '/' + this.currentUser?.userId);
  }

  updateUserProfile(profile: any) {
    return this._http.post<any>(
      userProfileUrl + '/' + this.currentUser?.userId,
      profile
    );
  }

  updateUserProfileImage(profileImage: any): Observable<any> {
    return this._http.patch<any>(
      userProfileUrl + '/profile-image/' + this.currentUser?.userId,
      profileImage
    );
  }

  /**Http Headers */
  /*
import { RequestOptions, Headers } from '@angular/http';
  getWhatever(){
    let headers = new Headers();
    let token = localstorage.getItem('token);
    headers.append('Authorzation', 'Bearer ' + token);

    let options = new RequestOptions({headers: headers})

    return this.http.get("/endpoint", options)
    .map(err=>response.json());
  }


  */
}
