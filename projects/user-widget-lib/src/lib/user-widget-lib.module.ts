import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscadorUsuarioComponent } from './components/buscador-usuario/buscador-usuario.component';
import { BuscadorUsuarioService } from './services/buscador-usuario.service';

@NgModule({
  declarations: [
    BuscadorUsuarioComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    BuscadorUsuarioService
  ],
  exports: [
    BuscadorUsuarioComponent
  ]
})
export class UserWidgetLibModule { }
