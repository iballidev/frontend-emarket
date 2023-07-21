import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { PreviewFileUploadService } from 'src/app/services/preview-file-upload.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { UserProfileService } from 'src/app/services/user-profile.service';
import { AddProductCategoryComponent } from '../add-product-category/add-product-category.component';

@Component({
  selector: 'app-update-product-category',
  templateUrl: './update-product-category.component.html',
  styleUrls: ['./update-product-category.component.scss'],
})
export class UpdateProductCategoryComponent implements OnInit {
  categoryId!: string;
  category: any;
  model: any = {};
  featuredImageFile!: File;
  loading!: boolean;
  // rawImg!: string | Blob;
  rawImg: any;
  uploadedImage = '';
  userProfileId: any;
  previewUploadedFile: any;
  btnTitle: string = 'Add category';
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private _previewFileUploadSvc: PreviewFileUploadService,
    private _userProfileSvc: UserProfileService,
    private _route: ActivatedRoute,
    private _router: Router,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getUserProfile();
  }

  getParams() {
    this._route.params.subscribe((params: any) => {
      // this.categoryId = params.get('categoryId');
      this.categoryId = params.categoryId;
      this.getCategory(this.categoryId);
    });
  }

  getUserProfile() {
    this._userProfileSvc.getUserProfile().subscribe((data: any) => {
      this.userProfileId = data.profile._id;
    });
  }

  getCategory(categoryId: string) {
    this._productCategorySvc.getProductCategory(categoryId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response) {
            this.category = response?.category;
            this.model.Title = response?.category.title;
          }
        }
      },
      error: (err: any) => {
        if (err) {
          console.log('Error: ', err);
        }
      },
    });
  }

  onChange(event: any) {
    // this.featuredImageFile = event.target.files[0];
    // console.log('this.featuredImageFile: ', this.featuredImageFile);
    this.rawImg = event.target.files[0];
    this.uploadedImage = this.rawImg.name;

    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.featuredImageFile = event.target.files[0];
      let payload = {
        previewFile: this.featuredImageFile,
        createdBy: this.userProfileId,
      };
      this._previewFileUploadSvc.uploadFile(payload).subscribe({
        next: (data: any) => {
          if (data) {
            this.previewUploadedFile = data.previewFile;
          }
        },
        error: (err) => {
          if (err) {
            console.error('Error: ', err);
          }
        },
      });
    };
  }

  update() {
    const category: any = {
      title: this.model.Title,
      updatedDate: new Date(),
      categoryFeaturedImage: this.featuredImageFile,
    };

    this.loading = !this.loading;

    let payload = {
      categoryId: this.categoryId,
      userProfile: this.userProfileId,
      category: category,
    };

    this._productCategorySvc
      .updateProductCategory(payload)
      .subscribe((response: any) => {
        if (response) {
          this.loading = false;
          console.log('response: ', response);
          this._router.navigate(['/admin/product-categories']);
        }
      });
  }

  openAddProductCategory($event: boolean) {
    console.log('$event: ', $event);
    if ($event) {
      const modalRef = this.modalService.open(AddProductCategoryComponent, {
        centered: true,
      });
      // const modalRef = this.modalService.open(AddProductCategoryComponent, { fullscreen: true });
      modalRef.componentInstance.description = 'Create a new product category';
    }
  }

  back() {
    history.back();
  }
}
