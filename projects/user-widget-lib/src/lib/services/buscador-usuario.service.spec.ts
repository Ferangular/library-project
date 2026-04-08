import { TestBed } from '@angular/core/testing';

import { BuscadorUsuarioService } from './buscador-usuario.service';

describe('BuscadorUsuarioService', () => {
  let service: BuscadorUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscadorUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
