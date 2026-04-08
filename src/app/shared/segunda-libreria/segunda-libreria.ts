import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Usuario } from '../../../../projects/user-widget-lib/src/lib/components/usuario/usuario';
import {
  BuscadorUsuario
} from '../../../../projects/user-widget-lib/src/lib/components/buscador-usuario/buscador-usuario';

@Component({
  selector: 'app-segunda-libreria',
  imports: [Usuario, BuscadorUsuario],
  templateUrl: './segunda-libreria.html',
  styleUrl: './segunda-libreria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SegundaLibreria {}
