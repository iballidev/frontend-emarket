import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productCategory = [
    {
      id: '1',
      title: 'electronics',
      categoryImg: '../../../assets/images/pexels-george-milton-6953871.jpg',
      categoryUrl: '#',
    },
    {
      id: '2',
      title: 'fashion',
      categoryImg: '../../../assets/images/pexels-bella-zhong-3602449.jpg',
      categoryUrl: '#',
    },
    {
      id: '3',
      title: 'toys',
      categoryImg: '../../../assets/images/pexels-pixabay-163036.jpg',
      categoryUrl: '#',
    },
    {
      id: '4',
      title: 'gaming',
      categoryImg: '../../../assets/images/pexels-mahavir-shah-15822012.jpg',
      categoryUrl: '#',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
