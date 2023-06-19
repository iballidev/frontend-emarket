import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroOwlCarouselComponent } from './hero-owl-carousel.component';

describe('HeroOwlCarouselComponent', () => {
  let component: HeroOwlCarouselComponent;
  let fixture: ComponentFixture<HeroOwlCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroOwlCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroOwlCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
