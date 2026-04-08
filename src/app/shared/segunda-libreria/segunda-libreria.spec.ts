import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaLibreria } from './segunda-libreria';

describe('SegundaLibreria', () => {
  let component: SegundaLibreria;
  let fixture: ComponentFixture<SegundaLibreria>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundaLibreria],
    }).compileComponents();

    fixture = TestBed.createComponent(SegundaLibreria);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
