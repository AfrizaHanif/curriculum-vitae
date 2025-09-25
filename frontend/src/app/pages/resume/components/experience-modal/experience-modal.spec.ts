import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceModalComponent } from './experience-modal';

describe('ExperienceModalComponent', () => {
  let component: ExperienceModalComponent;
  let fixture: ComponentFixture<ExperienceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExperienceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExperienceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
