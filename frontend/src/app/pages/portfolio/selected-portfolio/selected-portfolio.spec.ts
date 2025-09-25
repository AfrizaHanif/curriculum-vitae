import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPortfolio } from './selected-portfolio';

describe('SelectedPortfolio', () => {
  let component: SelectedPortfolio;
  let fixture: ComponentFixture<SelectedPortfolio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPortfolio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPortfolio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
