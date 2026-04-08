import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorUsuario } from './buscador-usuario';

describe('BuscadorUsuario', () => {
  let component: BuscadorUsuario;
  let fixture: ComponentFixture<BuscadorUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscadorUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(BuscadorUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
