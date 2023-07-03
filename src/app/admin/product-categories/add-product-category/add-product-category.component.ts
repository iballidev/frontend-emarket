import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { UserProfileService } from 'src/app/services/user-profile.service';

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
  userProfile: any;
  file!: FormData;

  createProductCategoryForm!: FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private _productCategorySvc: ProductCategoryService,
    private _userProfileSvc: UserProfileService,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this._userProfileSvc.getUserProfile().subscribe({
      next: (response: any) => {
        if (response) {
          if (response && response?.profile)
            console.log('userProfile: ', response);
          this.userProfile = response?.profile;
        }
      },
      error: (error: Response) => {
        if (error) {
          if (error.status == 409) alert('Auth failed!');
          else {
            alert('An unexpected error occurred.');
            console.log('Error: ', error);
          }
        }
      },
    });
  }

  buildForm() {
    this.createProductCategoryForm = this._fb.group({
      Title: '',
      FeaturedImage: '',
    });
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
    };
  }

  getUserProfile() {}

  createCategory() {
    console.log('model: ', this.model);
    const payload = {
      title: this.model.Title,
      categoryFeaturedImage: this.rawImg,
    };
    console.log('payload: ', payload);
    this._productCategorySvc
      .createProductCategory(this.userProfile._id, payload)
      .subscribe((response: any) => {
        if (response) {
          console.log('response: ', response);
          this.activeModal.dismiss("hello");
        }
      });
  }
}
