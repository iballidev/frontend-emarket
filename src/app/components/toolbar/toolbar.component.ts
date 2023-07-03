import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  navExpanded: boolean = false;
  constructor(public _authSvc: AuthService) {}

  ngOnInit(): void {
    console.log("user=>: ", this._authSvc.currentUser)
  }

  @ViewChild('navToggler') navToggler!: ElementRef;

  ngAfterViewInit() {
    console.log(this.navToggler.nativeElement.innerHTML);
  }

  toggleNav() {
    this.navExpanded = !this.navExpanded;
    console.log(' this.navExpanded: ', this.navExpanded);
  }
}
