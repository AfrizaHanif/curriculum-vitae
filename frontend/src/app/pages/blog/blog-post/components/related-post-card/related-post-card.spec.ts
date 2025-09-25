import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedPostCard } from './related-post-card';

describe('RelatedPostCard', () => {
  let component: RelatedPostCard;
  let fixture: ComponentFixture<RelatedPostCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatedPostCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatedPostCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
