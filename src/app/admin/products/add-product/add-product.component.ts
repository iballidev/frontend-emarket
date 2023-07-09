import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { ProductCategoryService } from 'src/app/services/product-category.service';

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
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
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

  buildForm() {
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      stock: [20, Validators.required],
      categories: [],
      productImage: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  get title() {
    return this.addProductForm.get('title');
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
    console.log(item);
    this.addProductForm.controls['categories'].setValue(this.selectedItems);
    console.log(' this.addProductForm : ', this.addProductForm.value);
  }
  onSelectAll(items: any) {
    console.log(items);
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
            console.log('response: ', response);
            this.productCategoryList = response.category;
          }
        },
      });
  }

  onSelectImage($event: any) {
    console.log('$event: ', $event.target.files[0]);
    console.log('title: ', this.title);
    let file = $event.target.files[0];
    let fileForm = new FormData();
    fileForm.append('productImge', file);
    console.log('fileForm: ', fileForm);
    this.addProductForm.controls['productImage'].setValue(file);
    console.log(' this.addProductForm : ', this.addProductForm.value);
  }

  submitProduct(data: any) {
    console.log('data: ', data);
  }

  back() {
    history.back();
  }

  /** */
}
