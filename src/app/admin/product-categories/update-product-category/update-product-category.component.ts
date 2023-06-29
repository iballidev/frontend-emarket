import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';

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
  constructor(
    private _productCategorySvc: ProductCategoryService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params: any) => {
      console.log('params: ', params);
      // this.categoryId = params.get('categoryId');
      this.categoryId = params.categoryId;
      this.getCategory(this.categoryId);
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
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.featuredImageFile = event.target.files[0];
      // this.label = this.uploadedFile.name;
      // this.isSelected = true;

      const formData = new FormData();
      formData.append('UploadFile', this.rawImg);
      console.log('formData: ', formData);
    };
  }

  update() {
    const payload: any = {
      title: this.model.Title,
      updatedDate: new Date(),
      categoryFeaturedImage: this.featuredImageFile,
    };

    console.log('payload: ', payload);

    this.loading = !this.loading;

    this._productCategorySvc
      .updateProductCategory(this.categoryId, payload)
      .subscribe((response: any) => {
        if (response) {
          this.loading = false;
          console.log('response: ', response);
        }
      });
  }
}
