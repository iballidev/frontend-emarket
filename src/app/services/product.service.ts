import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productUrl } from '../config/api';
import { Observable, catchError, map, observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { UserProfileService } from './user-profile.service';
import { buildQueryParams } from '../helpers/buildQueryParams';
import { AppError } from '../common/app-error';
import { NotFoundError } from '../common/not-found-error';
import { BadInputError } from '../common/bad-input-error';
import { handleError } from '../common/handleError';
import { DataService } from './data/data.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService extends DataService {
  userProfile: any;
  constructor(private _http: HttpClient) {
    super(productUrl, _http);
  }

  getProducts(resource: any) {
    return this.getAll(resource).pipe(
      map((dbData) => {
        return {
          count: dbData.count,
          message: dbData.message,
          pageNumber: dbData.pageNumber,
          pageSize: dbData.pageSize,
          products: dbData.products.map((data: any) => {
            return {
              id: data._id,
              title: data.title,
              price: data.price,
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

  createNewProduct(Payload: any) {
    const product = Payload.product;
    const params = Payload.params;

    let prop = new FormData();
    for (const key in product) {
      if (key === 'categories') {
        /**Loop through the array value for categories and appending with the formData */
        product[key].forEach((element: any, index: any) => {
          prop.append(`categories[${index}]`, element);
        });
      } else {
        prop.append(key, product[key]);
      }
    }
    return this._http
      .post(`${productUrl}/${params}`, prop)
      .pipe(catchError(handleError));
  }

  

  updateProduct(Payload: any) {    
    const product = Payload.product;
    const params = Payload.params;

    let prop = new FormData();
    for (const key in product) {
      if (key === 'categories') {
        /**Loop through the array value for categories and appending with the formData */
        product[key].forEach((element: any, index: any) => {
          prop.append(`categories[${index}]`, element);
        });
      } else {
        prop.append(key, product[key]);
      }
    }

    return this._http
      .patch<any>(`${productUrl}/${params}`, prop)
      .pipe(catchError(handleError));
  }
}

// interface Product {
//   title: string;
//   productImage: File;
//   description: string;
//   stock: number;
//   categories: string[];
// }
