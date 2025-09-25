import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileSubheader } from './profile-subheader';

describe('ProfileSubheader', () => {
  let component: ProfileSubheader;
  let fixture: ComponentFixture<ProfileSubheader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileSubheader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileSubheader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
