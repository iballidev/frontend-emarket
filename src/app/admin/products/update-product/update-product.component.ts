import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { map, tap } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { Product } from 'src/app/models/interfaces/product';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
})
export class UpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup;
  productCategoryList!: any[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  isMultiSeletDropdownTouched: boolean = false;
  categoryList: any;
  dbProductImage!: string;
  dbProductTitle!: string;
  productId!: string;
  userProfileId: any;
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private formBuilder: FormBuilder,
    private _productSvc: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private _userProfileSvc: UserProfileService
  ) {}

  ngOnInit(): void {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        this.userProfileId = response?.profile._id;
      },
    });
    this.getProductCategory();
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'title',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };

    this.getQueryParams();
    this.buildForm();
  }

  getQueryParams() {
    this.route.paramMap
      .pipe(map((params) => params.get('productId')))
      .subscribe((id: any) => {
        this.productId = id;
        this.getProductById(id);
      });
  }

  getProductById(productId: any) {
    this._productSvc.getByResource(productId).subscribe({
      next: (value) => {
        if (value) {
          let product = value?.product;
          this.dbProductImage = value?.product.productImage;
          this.dbProductTitle = value?.product.title;
          let newList = product.categories.map((item: any) => {
            return {
              id: item._id,
              title: item.title,
            };
          });

          this.selectedItems = [...newList];
          this.fillForm(product);
        }
      },
    });
  }

  buildForm() {
    this.updateProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      stock: [20, Validators.required],
      categories: [],
      isOutOfStock: null,
      productImage: null,
      description: '',
    });
  }

  get title() {
    return this.updateProductForm.get('title');
  }

  get price() {
    return this.updateProductForm.get('price');
  }

  get categories() {
    return this.updateProductForm.get('categories');
  }

  get stock() {
    return this.updateProductForm.get('stock');
  }

  get productImage() {
    return this.updateProductForm.get('productImage');
  }

  get description() {
    return this.updateProductForm.get('description');
  }

  fillForm(data: any) {
    this.updateProductForm.controls['title'].setValue(data.title);
    this.updateProductForm.controls['price'].setValue(data.price);
    this.updateProductForm.controls['stock'].setValue(data.stock);
    this.updateProductForm.controls['categories'].setValue(this.selectedItems);
    this.updateProductForm.controls['description'].setValue(data.description);
    this.updateProductForm.controls['isOutOfStock'].setValue(data.isOutOfStock);
  }

  onItemSelect(item: any) {
    this.isMultiSeletDropdownTouched = true;

    let arr: string[] = [];
    this.selectedItems.forEach((item) => {
      arr.push(item.id);
    });

    this.updateProductForm.controls['categories'].setValue(arr);
  }

  onSelectAll(items: any) {
    this.arrangeCategoryList(items);
  }

  getProductCategory() {
    let userQuery = {
      pageSize: null,
      pageNumber: null,
    };
    this._productCategorySvc
      .getProductCategoryList(buildQueryParams(userQuery))
      .subscribe({
        next: (response: any) => {
          if (response && response.category) {
            this.productCategoryList = response.category;
          }
        },
      });
  }

  onSelectImage($event: any) {
    let file = $event.target.files[0];
    this.updateProductForm.controls['productImage'].setValue(file);
  }

  submitProduct(data: any) {
    this.arrangeCategoryList(this.selectedItems);

    const product: Product = {
      title: this.updateProductForm.value.title,
      price: this.updateProductForm.value.price,
      productImage: this.updateProductForm.value.productImage,
      stock: this.updateProductForm.value.stock,
      isOutOfStock: this.updateProductForm.value.isOutOfStock,
      categories: this.updateProductForm.value.categories,
      description: this.updateProductForm.value.description,
    };

    const payload: any = {
      product: product,
      params: `${this.productId}/${this.userProfileId}`,
    };

    this._productSvc.updateProduct(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/admin/products']);
        }
      },
    });
  }

  arrangeCategoryList(categories: any[]) {
    let arr: string[] = [];
    categories.forEach((item) => {
      arr.push(item.id);
    });
    this.updateProductForm.controls['categories'].setValue(arr);
  }

  back() {
    history.back();
  }

  /** */
}
