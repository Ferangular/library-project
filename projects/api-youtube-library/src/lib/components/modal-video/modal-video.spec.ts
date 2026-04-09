import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVideo } from './modal-video';

describe('ModalVideo', () => {
  let component: ModalVideo;
  let fixture: ComponentFixture<ModalVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalVideo],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
