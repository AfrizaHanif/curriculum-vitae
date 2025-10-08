import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceFeature } from './service-feature';

describe('ServiceFeature', () => {
  let component: ServiceFeature;
  let fixture: ComponentFixture<ServiceFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
