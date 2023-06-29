import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
})
export class UserAccountComponent implements OnInit {
  productList = [
    {
      id: '1',
      productImage: '',
      title: 'Product 1',
      quantity: 2,
      price: 2000,
      orderDate: new Date("2023/03/02"),
      updatedDate: new Date(),
      cost: 4000,
    },
  ];

  //   <td>
  //   <div style="max-width: 30px; max-height: 30px; overflow: hidden;">
  //       <img [src]="category.featuredImg" alt="" class="img-fluid">
  //   </div>
  // </td>
  // <!-- <td>Silver stones arabic lace</td> -->
  // <td>{{ category.title | titlecase }}</td>
  // <td>{{ category.createdBy | titlecase }}</td>
  // <td>{{ category.createdDate | date}}</td>
  // <td>{{ category.updatedDate | date}}</td>
  constructor() {}

  ngOnInit(): void {}

  onDeleteCategory(Order: any) {}
}
