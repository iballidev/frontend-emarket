import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { AppError } from 'src/app/common/app-error';
import { BadInputError } from 'src/app/common/bad-input-error';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { ProductCategoryState } from 'src/app/stores/product-category-store/product-category.reducer';
import * as fromProductCategoryActions from "../../../stores/product-category-store/product-category.actions";

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss'],
})
export class AddProductCategoryComponent implements OnInit {
  @Input() description!: any;
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  model: any = {};
  rawImg!: File;
  file!: FormData;
  validationError!: boolean;

  createProductCategoryForm!: FormGroup;
  userProfileId: any;
  constructor(
    public activeModal: NgbActiveModal,
    private _productCategorySvc: ProductCategoryService,
    private _userProfileSvc: UserProfileService,
    private _fb: FormBuilder,
    private store: Store<ProductCategoryState>
  ) {}

  ngOnInit(): void {
    this.getUserProfile();
    this.buildForm();
    this.checkValidation();
  }

  buildForm() {
    this.createProductCategoryForm = this._fb.group({
      Title: '',
      FeaturedImage: '',
    });
  }

  checkValidation() {
    if (this.createProductCategoryForm.valid || this.rawImg) {
      if (!this.rawImg) this.validationError = true;
      else this.validationError = false;
    }
  }
  onSelect(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      //
      /** this.rawImg = event.target.files[0];
       * OR
       * this.rawImg = this.fileInput.nativeElement.files[0];
       * */

      this.rawImg = this.fileInput.nativeElement.files[0];
      this.checkValidation();
    };
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        if (response) {
          if (response && response?.profile)
            this.userProfileId = response?.profile._id;
        }
      },
      error: (error: Response) => {
        if (error) {
          if (error.status == 409) alert('Auth failed!');
          else {
            alert('An unexpected error occurred.');
            // console.log('Error: ', error);
          }
        }
      },
    });
  }

  createCategory() {
    const category = {
      title: this.model.Title,
      categoryFeaturedImage: this.rawImg,
    };

    let payload = {
      category: category,
      userProfileId: this.userProfileId,
    };

    this.store.dispatch(fromProductCategoryActions.addProductCategory({payload}))
    // this._productCategorySvc.createProductCategory(payload).subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       // console.log('response: ', response);
    //       this.activeModal.dismiss('hello');
    //     }
    //   },
    //   error: (err: AppError) => {
    //     console.log('Error: ', err);
    //     if (err instanceof BadInputError)
    //       return this.createProductCategoryForm.setErrors(err.OriginalError);
    //     else throw err;
    //   },
    // });
  }
}
