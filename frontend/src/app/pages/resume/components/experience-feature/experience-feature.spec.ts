import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceFeatureComponent } from './experience-feature';

describe('ExperienceFeatureComponent', () => {
  let component: ExperienceFeatureComponent;
  let fixture: ComponentFixture<ExperienceFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceFeatureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
