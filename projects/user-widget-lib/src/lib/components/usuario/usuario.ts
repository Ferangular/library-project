import { Component, input, computed, signal, inject } from '@angular/core';
import { USUARIOAPI } from '../../constants/usuario';
import { Usuario as UsuarioInterface } from '../../interfaces/usuario.interface';
import { BuscadorUsuarioService } from '../../services/buscador-usuario.service';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'uw-usuario',
  imports: [],
  templateUrl: './usuario.html',
  styleUrl: './usuario.css',
})
export class Usuario {
  busqueda = input<string>('');

  private _usuario = signal<UsuarioInterface | null>(null);

  usuario = computed(() => {
    const busquedaValor = this.busqueda();

    if (busquedaValor === undefined || busquedaValor === null || busquedaValor === '') {
      console.log('Usando la constante');
      this._usuario.set(USUARIOAPI);
    } else {
      console.log('Buscando en la api', busquedaValor);
      this.buscadorServicio.obtenerDatosUsuario(busquedaValor).pipe(
        tap((data: UsuarioInterface) => {
          this._usuario.set(data);
        })
      ).subscribe();
    }

    return this._usuario();
  });
  buscadorServicio = inject(BuscadorUsuarioService);

}
