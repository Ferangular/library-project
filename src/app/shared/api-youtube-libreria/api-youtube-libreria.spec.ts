import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiYoutubeLibreria } from './api-youtube-libreria';

describe('ApiYoutubeLibreria', () => {
  let component: ApiYoutubeLibreria;
  let fixture: ComponentFixture<ApiYoutubeLibreria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiYoutubeLibreria],
    }).compileComponents();

    fixture = TestBed.createComponent(ApiYoutubeLibreria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
