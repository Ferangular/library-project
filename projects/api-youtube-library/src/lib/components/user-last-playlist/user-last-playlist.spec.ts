import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLastPlaylist } from './user-last-playlist';

describe('UserLastPlaylist', () => {
  let component: UserLastPlaylist;
  let fixture: ComponentFixture<UserLastPlaylist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserLastPlaylist],
    }).compileComponents();

    fixture = TestBed.createComponent(UserLastPlaylist);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
