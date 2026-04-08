import { Component } from '@angular/core';
import { BuscadorUsuario, UsuarioComponent } from 'user-widget-lib';

@Component({
  selector: 'app-root',
  imports: [BuscadorUsuario, UsuarioComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {

}
