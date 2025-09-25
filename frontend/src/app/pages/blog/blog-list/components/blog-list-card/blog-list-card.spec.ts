import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogListCardComponent } from './blog-list-card';

describe('BlogListCard', () => {
  let component: BlogListCardComponent;
  let fixture: ComponentFixture<BlogListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogListCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
