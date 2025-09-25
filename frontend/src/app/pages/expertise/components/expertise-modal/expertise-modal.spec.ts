import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertiseModal } from './expertise-modal';

describe('ExpertiseModal', () => {
  let component: ExpertiseModal;
  let fixture: ComponentFixture<ExpertiseModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpertiseModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpertiseModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
