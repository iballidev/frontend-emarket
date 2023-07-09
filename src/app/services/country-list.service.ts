import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { countryListUrl } from '../config/api';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryListService {
  constructor(private http: HttpClient) {}

  getCountryList(): Observable<any> {
    return this.http.get<any>(`${countryListUrl}/all`).pipe(
      map((data) => {
        console.log('data: ', data);
        return {
          data: data.countries.map((country:any)=>{
            return {
              id: country.id,
              name: country.name.common
            }
          }),
        };
      })
    );
  }
}
