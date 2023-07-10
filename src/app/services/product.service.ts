import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { productUrl } from '../config/api';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _http: HttpClient, private _authSvc: AuthService) {}

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

  createNewProduct(Product: Product) {
    return this._http.post(
      `${productUrl}/${this._authSvc.currentUser._id}`,
      Product
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
