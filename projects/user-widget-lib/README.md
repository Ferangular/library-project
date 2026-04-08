# User Widget Library

Una librería Angular moderna para mostrar información de usuarios de GitHub con un componente de búsqueda interactivo y elegante.

## Características

- **Componente de búsqueda** con autocompletado y sugerencias
- **Tarjeta de usuario** con diseño moderno y animaciones
- **Soporte para modo oscuro**
- **Totalmente responsive**
- **BEM methodology** para estilos mantenibles
- **Signal-based** para rendimiento óptimo
- **TypeScript** para seguridad de tipos

## Instalación

```bash
npm install user-widget-lib
```

## Uso

Importa los componentes en tu aplicación:

```typescript
import { Component } from '@angular/core';
import { BuscadorUsuarioComponent, UsuarioComponent } from 'user-widget-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BuscadorUsuarioComponent, UsuarioComponent],
  template: `
    <uw-buscador-usuario></uw-buscador-usuario>
  `
})
export class AppComponent {}
```

## Componentes

### BuscadorUsuarioComponent

Componente de búsqueda con autocompletado y sugerencias.

```html
<uw-buscador-usuario></uw-buscador-usuario>
```

Características:
- Búsqueda en tiempo real
- Sugerencias al pasar el cursor
- Animaciones suaves
- Diseño moderno con BEM

### UsuarioComponent

Muestra información detallada del usuario de GitHub.

```html
<uw-usuario [busqueda]="nombreUsuario"></uw-usuario>
```

Propiedades:
- `busqueda`: string - Nombre de usuario a buscar

## API Reference

#### BuscadorUsuarioComponent

```typescript
export class BuscadorUsuario {
  busquedaRealizada: EventEmitter<string>;
}
```

#### UsuarioComponent

```typescript
export class Usuario {
  busqueda: InputSignal<string>;
  usuario: Signal<UsuarioInterface | null>;
}
```

## Ejemplo completo

```typescript
import { Component } from '@angular/core';
import { BuscadorUsuarioComponent, UsuarioComponent } from 'user-widget-lib';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [BuscadorUsuarioComponent, UsuarioComponent],
  template: `
    <div class="container">
      <h1>GitHub User Widget</h1>
      <uw-buscador-usuario></uw-buscador-usuario>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
  `]
})
export class DemoComponent {}
```

## Dependencias

- Angular 21.2.0+
- Angular Forms 21.2.0+

## Desarrollo

```bash
# Clonar el repositorio
git clone https://github.com/your-username/user-widget-lib.git
cd user-widget-lib

# Instalar dependencias
npm install

# Construir la librería
ng build user-widget-lib

# Ejecutar tests
ng test
```

## Publicación

Para publicar una nueva versión:

```bash
# Construir la librería
ng build user-widget-lib

# Navegar al directorio de build
cd dist/user-widget-lib

# Publicar en npm
npm publish
```

## Licencia

MIT License - ver archivo LICENSE para detalles.

## Contribuciones

¡Las contribuciones son bienvenidas! Por favor abre un issue o submit un pull request.

## Changelog

### 0.0.1
- Versión inicial
- Componente BuscadorUsuario
- Componente Usuario
- Soporte para modo oscuro
- Diseño responsive
