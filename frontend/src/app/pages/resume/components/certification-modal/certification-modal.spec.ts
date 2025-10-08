import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificationModal } from './certification-modal';

describe('CertificationModal', () => {
  let component: CertificationModal;
  let fixture: ComponentFixture<CertificationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
