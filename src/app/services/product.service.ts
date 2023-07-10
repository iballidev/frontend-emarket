import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productUrl } from '../config/api';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  userProfile: any;
  constructor(
    private _http: HttpClient,
    private _authSvc: AuthService,
    private _userProfileSvc: UserProfileService
  ) {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        console.log('response: ', response);
        this.userProfile = response;
      },
      error: (err) => {
        if (err) {
          console.error('Error: ', err);
        }
      },
    });
  }

  getProductCategoryList(queryParams?: any): Observable<any> {
    return this._http.get<any>(`${productUrl}/all${queryParams}`).pipe(
      map((response: any) => {
        console.log('response: ', response);
        const body = response;
        return {
          count: body.count,
          message: body.message,
          pageNumber: body.pageNumber,
          pageSize: body.pageSize,
          products: body.products.map((data: any) => {
            return {
              id: data._id,
              title: data.title,
              productImage: data.productImage,
              categoryUrl: data.title,
              createdBy: data.createdBy,
              createdDate: data.createdDate,
              updatedDate: data.updatedDate,
              updatedBy: data.updatedBy,
              stock: data.stock,
              isOutOfStock: data.isOutOfStock,
            };
          }),
        };
      })
    );
  }

  createNewProduct(Product: any) {
    let prop = new FormData();
    for (const key in Product) {
      // console.log(key, Product[key], '\n');
      if (key === 'categories') {
        // console.log('typeof Product[key]', typeof Product[key]);
        let count = 0;
        while (count <= Product[key].length) {
          // console.log('key[count]: ', key[count]);
          console.log(key + `[${count}]`, Product[key][count]);
          prop.append(key + `[${count}]`, Product[key][count]);
          count++;
        }
      }
      prop.append(key, Product[key]);
    }

    console.log('prop: ', prop);

    // let fileForm = new FormData();
    // fileForm.append('productImge', file);
    // console.log('fileForm: ', fileForm);

    return this._http.post(
      `${productUrl}/${this.userProfile?.profile._id}`,
      prop
    );
  }
}

interface Product {
  title: string;
  productImage: File;
  description: string;
  stock: number;
  categories: string[];
}
