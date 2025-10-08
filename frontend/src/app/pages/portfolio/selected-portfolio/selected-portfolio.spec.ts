import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedPortfolioComponent } from './selected-portfolio';

describe('SelectedPortfolioComponent', () => {
  let component: SelectedPortfolioComponent;
  let fixture: ComponentFixture<SelectedPortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedPortfolioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedPortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
