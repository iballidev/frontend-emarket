import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/interfaces/product-category';
import { Observable, map } from 'rxjs';
import { productCategoryUrl } from '../config/api';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  // productCategoryUr =
  constructor(private _http: HttpClient) {}

  createProductCategory(UserProfileId: string, Payload: any) {
    const formData = new FormData();
    for (let prop in Payload) {
      formData.append(prop, Payload[prop]);
    }
    return this._http.post(productCategoryUrl + '/' + UserProfileId, formData);
  }

  getProductCategoryList(): Observable<ProductCategory> {
    return this._http.get<ProductCategory>(productCategoryUrl + '/all').pipe(
      map((response: any) => {
        console.log('response: ', response);
        const body = response?.category.categoryList;
        return body.map((data: any) => {
          return {
            id: data._id,
            title: data.title,
            featuredImg: data.featuredImage,
            categoryUrl: data.title,
            createdBy: data.createdBy,
            createdDate: data.createdDate,
            updatedDate: data.updatedDate,
          };
        });
      })
    );
  }

  getProductCategory(CategoryId: string) {
    return this._http.get<ProductCategory>(
      `${productCategoryUrl}/${CategoryId}`
    );
  }

  updateProductCategory(CategoryId: string, Payload: any) {
    return this._http.patch(productCategoryUrl + '/' + CategoryId, Payload);
  }

  deleteProductCategory(CategoryId: string) {
    return this._http.delete(productCategoryUrl + '/' + CategoryId);
  }
}
