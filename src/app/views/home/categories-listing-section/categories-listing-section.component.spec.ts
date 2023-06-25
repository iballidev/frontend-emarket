import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesListingSectionComponent } from './categories-listing-section.component';

describe('CategoriesListingSectionComponent', () => {
  let component: CategoriesListingSectionComponent;
  let fixture: ComponentFixture<CategoriesListingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesListingSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesListingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
