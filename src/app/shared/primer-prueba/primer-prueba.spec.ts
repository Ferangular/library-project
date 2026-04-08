import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimerPrueba } from './primer-prueba';

describe('PrimerPrueba', () => {
  let component: PrimerPrueba;
  let fixture: ComponentFixture<PrimerPrueba>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimerPrueba],
    }).compileComponents();

    fixture = TestBed.createComponent(PrimerPrueba);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
