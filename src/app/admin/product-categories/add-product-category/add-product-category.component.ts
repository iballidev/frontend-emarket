import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrls: ['./add-product-category.component.scss'],
})
export class AddProductCategoryComponent implements OnInit {
  @Input() description!: any;
  model: any = {};
  rawImg: any;
  constructor(public activeModal: NgbActiveModal,
    private _productCategorySvc: ProductCategoryService) {}

  ngOnInit(): void {}

  onSelect(event: any) {
    this.rawImg = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = () => {
      this.rawImg = event.target.files[0];
      // this.label = this.uploadedFile.name;
      // this.isSelected = true;

      const formData = new FormData();
      formData.append('UploadFile', this.rawImg);
      console.log('formData: ', formData);
      this.model.FeaturedImage = formData;
    };
  }

  createCategory() {
    console.log('model: ', this.model);
    // this._productCategorySvc
    // .createProductCategory(this.categoryId, payload)
    // .subscribe((response: any) => {
    //   if (response) {
    //     this.loading = false;
    //     console.log('response: ', response);
    //   }
    // });
  }
}
