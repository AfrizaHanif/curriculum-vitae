import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudySubheader } from './portfolio-case-study-subheader';

describe('CaseStudySubheader', () => {
  let component: CaseStudySubheader;
  let fixture: ComponentFixture<CaseStudySubheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudySubheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseStudySubheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
