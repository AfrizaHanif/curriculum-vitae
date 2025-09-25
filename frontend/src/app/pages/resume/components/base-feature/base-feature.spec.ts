import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFeature } from './base-feature';

describe('BaseFeature', () => {
  let component: BaseFeature;
  let fixture: ComponentFixture<BaseFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
