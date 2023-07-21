import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxPracticalComponent } from './ngrx-practical.component';

describe('NgrxPracticalComponent', () => {
  let component: NgrxPracticalComponent;
  let fixture: ComponentFixture<NgrxPracticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxPracticalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgrxPracticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
