import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { AppError } from 'src/app/common/app-error';
import { BadInputError } from 'src/app/common/bad-input-error';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { Product } from 'src/app/models/interfaces/product';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit {
  addProductForm!: FormGroup;
  productCategoryList!: any[];
  dropdownList: any[] = [];
  selectedItems: any[] = [];
  dropdownSettings: IDropdownSettings = {};
  isMultiSeletDropdownTouched: boolean = false;
  categoryList: any;
  userProfileId: any;
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private formBuilder: FormBuilder,
    private _productSvc: ProductService,
    private router: Router,
    private _userProfileSvc: UserProfileService
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
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

    this.buildForm();
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (data: any) => {
        this.userProfileId = data.profile._id;
      },
    });
  }
  buildForm() {
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: [null, Validators.required],
      stock: [20, Validators.required],
      categories: [],
      productImage: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  get title() {
    return this.addProductForm.get('title');
  }

  get price() {
    return this.addProductForm.get('price');
  }

  get categories() {
    return this.addProductForm.get('categories');
  }

  get stock() {
    return this.addProductForm.get('stock');
  }

  get productImage() {
    return this.addProductForm.get('productImage');
  }

  get description() {
    return this.addProductForm.get('description');
  }

  onItemSelect(item: any) {
    this.isMultiSeletDropdownTouched = true;

    let arr: string[] = [];
    this.selectedItems.forEach((item) => {
      arr.push(item.id);
    });

    this.addProductForm.controls['categories'].setValue(arr);
  }

  onSelectAll(items: any) {
    let arr: string[] = [];
    items.forEach((item: any) => {
      arr.push(item.id);
    });

    this.addProductForm.controls['categories'].setValue(arr);
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

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.addProductForm.controls['productImage'].setValue(file);
    };
  }

  submitProduct(data: any) {
    const payload: any = {
      product: { ...data },
      params: this.userProfileId,
    };
    this._productSvc.createNewProduct(payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/admin/products']);
        }
      },
      error: (err: AppError) => {
        if (err instanceof BadInputError)
          return this.addProductForm.setErrors(err.OriginalError);
        else throw err;
      },
    });
  }

  back() {
    history.back();
  }

  /** */
}
