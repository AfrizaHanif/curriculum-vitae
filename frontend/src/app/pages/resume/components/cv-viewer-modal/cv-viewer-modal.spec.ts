import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewerModal } from './cv-viewer-modal';

describe('CvViewerModal', () => {
  let component: CvViewerModal;
  let fixture: ComponentFixture<CvViewerModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvViewerModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvViewerModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
