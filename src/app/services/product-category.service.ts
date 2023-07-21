import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductCategory } from '../models/interfaces/product-category';
import { Observable, catchError, map } from 'rxjs';
import { productCategoryUrl } from '../config/api';
import { UserProfileService } from './user-profile.service';
import { DataService } from './data/data.service';
import { handleError } from '../common/handleError';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService extends DataService {
  userProfile: any;
  // productCategoryUr =
  constructor(private _http: HttpClient) {
    super(productCategoryUrl, _http);

    // this._userProfileSvc.getUserProfile().subscribe({
    //   next: (response: any) => {
    //     console.log('response: ', response);
    //     this.userProfile = response;
    //   },
    //   error: (err) => {
    //     if (err) {
    //       console.error('Error: ', err);
    //     }
    //   },
    // });
  }

  createProductCategory(Payload: any) {
    let userProfileId = Payload.userProfileId;
    let category = Payload.category;
    const formData = new FormData();
    for (let prop in category) {
      formData.append(prop, category[prop]);
    }
    return this._http
      .post(productCategoryUrl + '/' + userProfileId, formData)
      .pipe(catchError(handleError));
  }

  getProductCategoryList(queryParams?: any) {
    return this.getAll(`/all${queryParams}`).pipe(
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
      }),
      catchError(handleError)
    );
  }

  getProductCategory(CategoryId: string) {
    return this._http
      .get<ProductCategory>(`${productCategoryUrl}/${CategoryId}`)
      .pipe(catchError(handleError));
  }

  updateProductCategory(Payload: any) {
    let categoryId = Payload.categoryId;
    let userProfile = Payload.userProfile;
    let category = Payload.category;

    const formData = new FormData();
    for (let prop in category) {
      formData.append(prop, category[prop]);
    }
    return this._http
      .patch(`${productCategoryUrl}/${categoryId}/${userProfile}`, formData)
      .pipe(catchError(handleError));
  }

  deleteProductCategory(CategoryId: string) {
    return this._http.delete(productCategoryUrl + '/' + CategoryId);
  }
}
