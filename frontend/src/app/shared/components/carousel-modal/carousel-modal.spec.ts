import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselModal } from './carousel-modal';

describe('CarouselModal', () => {
  let component: CarouselModal;
  let fixture: ComponentFixture<CarouselModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
