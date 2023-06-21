import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  navExpanded: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  @ViewChild('navToggler') navToggler!: ElementRef;

  ngAfterViewInit() {
      console.log(this.navToggler.nativeElement.innerHTML);
  }

  toggleNav() {
    this.navExpanded = !this.navExpanded;
  }
}
