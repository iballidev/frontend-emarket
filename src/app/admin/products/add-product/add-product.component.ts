import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

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
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private formBuilder: FormBuilder,
    private _productSvc: ProductService
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

    let arr: string[] = [];
    this.selectedItems.forEach((item) => {
      arr.push(item.id);
    });

    this.addProductForm.controls['categories'].setValue(arr);
  }

  onSelectAll(items: any) {
    let arr: string[] = [];
    items.forEach((item:any) => {
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
    this.addProductForm.controls['productImage'].setValue(file);
    console.log(' this.addProductForm : ', this.addProductForm.value);
  }

  submitProduct(data: any) {
    console.log('data: ', data);
    this._productSvc.createNewProduct(data).subscribe({
      next(response: any) {
        if (response) {
          console.log('response: ', response);
        }
      },
      error(err) {
        if (err) {
          console.log('Error: ', err);
        }
      },
    });
  }

  back() {
    history.back();
  }

  /** */
}
