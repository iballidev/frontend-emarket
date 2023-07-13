import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { FilterDropdown } from 'src/app/models/enums/filter';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  btnTitle: string = 'Add product';
  btnType: string = 'submit';
  pageNumber!: number;
  pageSize!: number;
  totalCount!: number;
  products: any;
  filterTerm: any;
  filterOptions = ['A-Z order', 'Z-A order', 'Lowest price', 'Highest price'];
  SearchTerm: string = '';
  SearchTermForm: any;
  SortItem = {};

  // ASCENDING = 'ASCENDING',
  // DESCENDING = 'DESCENDING',
  // DATE_CREATED = 'DATE_CREATED',
  // HIGHEST_PRICE = 'HIGHEST PRICE',
  // LOWEST_PRICE = 'LOWEST PRICE',

  filterDropdownList = [
    FilterDropdown?.ASCENDING,
    FilterDropdown?.DESCENDING,
    FilterDropdown?.DATE_CREATED,
    FilterDropdown?.HIGHEST_PRICE,
    FilterDropdown?.LOWEST_PRICE,
  ];

  constructor(private _productSvc: ProductService, private _router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  sortReportListBy(FilterForm: any) {
    console.warn('FilterForm: ', FilterForm.value.Filter);
    console.log('this.products: ', this.products);
    let SortItem = FilterForm.value.Filter;
    switch (SortItem) {
      case FilterDropdown.ASCENDING:
        this.products = [...this.products].sort((a: any, b: any) =>
          a['title'] > b['title'] ? 1 : -1
        );
        console.log('arange: ', this.products);
        break;

      case FilterDropdown.DESCENDING:
        this.products = [...this.products].sort((a: any, b: any) =>
          a['title'] > b['title'] ? -1 : 1
        );
        break;

      case FilterDropdown.DATE_CREATED:
        this.products = [...this.products].sort((a: any, b: any) => {
          let x = parseInt(a['createdDate']);
          let y = parseInt(b['createdDate']);
          return x > y ? 1 : -1;
        });
        break;

      case FilterDropdown.HIGHEST_PRICE:
        [...this.products].sort((a: any, b: any) => {
          let x = parseInt(a['price']);
          let y = parseInt(b['price']);
          return x > y ? -1 : 1;
        });
        break;

      case FilterDropdown.LOWEST_PRICE:
        this.products = [...this.products].sort((a: any, b: any) => {
          let x = parseInt(a['price']);
          let y = parseInt(b['price']);
          return x > y ? 1 : -1;
        });
        break;

      default:
        return this.products;
    }
  }

  onSearch(SearchTermForm: any) {
    console.log('SearchTermForm: ', SearchTermForm.value);
    this.SearchTerm = SearchTermForm.value.SearchTerm;
    console.log('Paginate: ', this.pageSize, this.pageNumber);
    const queryParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      searchTerm: this.SearchTerm,
    };
    let userQuery = {
      pageSize: queryParams.pageSize,
      pageNumber: queryParams.pageNumber,
      searchTerm: queryParams.searchTerm,
    };
    this._productSvc.getProductList(buildQueryParams(userQuery)).subscribe({
      next: (response: any) => {
        if (response) {
          this.products = response.products;
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
      },
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
  }

  onSelect($event: any) {
    console.log('$event: ', $event.target.value);
  }

  getAllProducts() {
    let userQuery = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    // this._productCategorySvc.getProductCategoryList(buildQueryParams(userQuery)).subscribe({
    this._productSvc.getProductList(buildQueryParams(userQuery)).subscribe({
      next: (response) => {
        if (response) {
          console.log('response: ', response);
          this.products = response.products;
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
      },
      error: (err: any) => {
        if (err) console.warn('Error: ', err);
      },
    });
  }

  AddProduct() {
    this._router.navigate(['/admin/add-product']);
  }

  onDeleteProduct(productId: any) {
    let userQuery = {
      id: productId,
    };
    this._productSvc.deleteProductById(buildQueryParams(userQuery)).subscribe({
      next: (value) => {
        if (value) {
          console.log('response: ', value);
          this.getAllProducts();
        }
      },
      error: (err) => {
        console.error('error: ', err);
      },
    });
  }

  openAddProductCategory($event: boolean) {}

  pageChangeEvent($event: any) {
    this.pageNumber = $event;
    console.log('Paginate: ', this.pageSize, this.pageNumber);
    const queryParams = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    };
    let userQuery = {
      pageSize: queryParams.pageSize,
      pageNumber: queryParams.pageNumber,
    };
    this._productSvc.getProductList(buildQueryParams(userQuery)).subscribe({
      next: (response: any) => {
        if (response) {
          this.products = response.products;
          this.pageNumber = response.pageNumber;
          this.pageSize = response.pageSize;
          this.totalCount = response.count;
        }
      },
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
  }
}
