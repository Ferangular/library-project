import { Component, input, output, signal, inject, computed } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Usuario } from '../usuario/usuario';

@Component({
  selector: 'uw-buscador-usuario',
  imports: [ReactiveFormsModule, Usuario],
  templateUrl: './buscador-usuario.html',
  styleUrl: './buscador-usuario.scss',
})
export class BuscadorUsuario {
  busquedaControl = new FormControl('', { nonNullable: true });
  buscando = signal(false);

  busquedaRealizada = output<string>();

  // Computed signal para obtener el valor del formulario
  textoBusqueda = computed(() => this.busquedaControl.value);

  // Computed signal para determinar si mostrar resultados
  mostrarResultados = computed(() => {
    const texto = this.textoBusqueda();
    return texto.trim().length > 0 && this.buscando();
  });

  constructor() {
    // Escuchar cambios en el formulario
    this.busquedaControl.valueChanges.subscribe(() => {
      this.realizarBusqueda();
    });
  }

  private realizarBusqueda() {
    const termino = this.textoBusqueda().trim();
    if (termino) {
      this.buscando.set(true);
      this.busquedaRealizada.emit(termino);
      // Opcional: Resetear el estado de búsqueda después de un tiempo
      setTimeout(() => this.buscando.set(false), 100);
    } else {
      this.buscando.set(false);
    }
  }

  onBuscar(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.realizarBusqueda();
    }
  }
}
