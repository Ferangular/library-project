import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'uw-buscador-usuario',
  imports: [],
  templateUrl: './buscador-usuario.html',
  styleUrl: './buscador-usuario.css',
})
export class BuscadorUsuario {
  textoBusqueda = signal('');
  buscando = signal(false);
  
  busquedaRealizada = output<string>();

  onBuscar(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const termino = this.textoBusqueda().trim();
      if (termino) {
        this.buscando.set(true);
        this.busquedaRealizada.emit(termino);
        this.buscando.set(false);
      }
    }
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.textoBusqueda.set(target.value);
  }
}
