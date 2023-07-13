import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/interfaces/product-category';
import { Observable, map } from 'rxjs';
import { productCategoryUrl } from '../config/api';
import { UserProfileService } from './user-profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  userProfile: any;
  // productCategoryUr =
  constructor(
    private _http: HttpClient,
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

  createProductCategory(UserProfileId: string, Payload: any) {
    const formData = new FormData();
    for (let prop in Payload) {
      formData.append(prop, Payload[prop]);
    }
    return this._http.post(productCategoryUrl + '/' + UserProfileId, formData);
  }

  getProductCategoryList(queryParams?: any): Observable<any> {
    return this._http.get<any>(`${productCategoryUrl}/all${queryParams}`).pipe(
      map((response: any) => {
        const body = response?.category;
        return {
          count: body.count,
          message: body.message,
          pageNumber: body.pageNumber,
          pageSize: body.pageSize,
          category: body.categoryList.map((data: any) => {
            return {
              id: data._id,
              title: data.title,
              featuredImg: data.featuredImage,
              categoryUrl: data.title,
              createdBy: data.createdBy,
              createdDate: data.createdDate,
              updatedDate: data.updatedDate,
            };
          }),
        };
      })
    );
  }

  getProductCategory(CategoryId: string) {
    return this._http.get<ProductCategory>(
      `${productCategoryUrl}/${CategoryId}`
    );
  }

  updateProductCategory(CategoryId: string, Payload: any) {
    const formData = new FormData();
    for (let prop in Payload) {
      formData.append(prop, Payload[prop]);
    }
    return this._http.patch(
      `${productCategoryUrl}/${CategoryId}/${this.userProfile.profile._id}`,
      formData
    );
  }

  deleteProductCategory(CategoryId: string) {
    return this._http.delete(productCategoryUrl + '/' + CategoryId);
  }
}
