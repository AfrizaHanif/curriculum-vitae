import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationFeatureComponent } from './education-feature';

describe('EducationFeatureComponent', () => {
  let component: EducationFeatureComponent;
  let fixture: ComponentFixture<EducationFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
