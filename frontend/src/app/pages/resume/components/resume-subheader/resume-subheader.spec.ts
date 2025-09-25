import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeSubheader } from './resume-subheader';

describe('ResumeSubheader', () => {
  let component: ResumeSubheader;
  let fixture: ComponentFixture<ResumeSubheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumeSubheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeSubheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
