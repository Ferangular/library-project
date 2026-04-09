import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistItems } from './playlist-items';

describe('PlaylistItems', () => {
  let component: PlaylistItems;
  let fixture: ComponentFixture<PlaylistItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistItems],
    }).compileComponents();

    fixture = TestBed.createComponent(PlaylistItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
