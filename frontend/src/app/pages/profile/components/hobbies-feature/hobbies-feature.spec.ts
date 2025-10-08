import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesFeature } from './hobbies-feature';

describe('HobbiesFeature', () => {
  let component: HobbiesFeature;
  let fixture: ComponentFixture<HobbiesFeature>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HobbiesFeature]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HobbiesFeature);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
