import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseFeature } from './expertise-feature';

describe('ExpertiseFeature', () => {
  let component: ExpertiseFeature;
  let fixture: ComponentFixture<ExpertiseFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
