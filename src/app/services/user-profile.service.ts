import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor() { }


  /**Http Headers */
  /*
import { RequestOptions, Headers } from '@angular/http';
  getWhatever(){
    let headers = new Headers();
    let token = localstorage.getItem('token);
    headers.append('Authorzation', 'Bearer ' + token);

    let options = new RequestOptions({headers: headers})

    return this.http.get("/endpoint", options)
    .map(response=>response.json());
  }


  */
}
