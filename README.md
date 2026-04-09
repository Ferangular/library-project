# Angular Library Development Guide

Guía completa para crear, desarrollar y publicar librerías Angular con componentes modernos.

---

## Tabla de Contenidos

1. [Creación del Proyecto](#creación-del-proyecto)
2. [Creación de Librerías](#creación-de-librerías)
3. [Desarrollo de Componentes](#desarrollo-de-componentes)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Construcción y Testing](#construcción-y-testing)
6. [Publicación en NPM](#publicación-en-npm)
7. [Despliegue Continuo](#despliegue-continuo)
8. [Best Practices](#best-practices)

---

## Creación del Proyecto

### 1. Crear nuevo proyecto Angular
```bash
ng new library-project --standalone --style=scss --routing=false --ssr=false
cd library-project
```

### 2. Estructura inicial
```
library-project/
src/
projects/
angular.json
package.json
```

---

## Creación de Librerías

### 1. Crear una librería base
```bash
ng g lib ui-library --prefix=ui
```

### 2. Crear múltiples librerías especializadas
```bash
# Librería de componentes UI
ng g lib ui-components --prefix=ui

# Librería de utilidades
ng g lib utils --prefix=ut

# Librería de servicios
ng g lib services --prefix=svc
```

### 3. Configurar librerías en angular.json
Las librerías se configuran automáticamente en `angular.json`:

```json
{
  "projects": {
    "ui-library": {
      "projectType": "library",
      "root": "projects/ui-library",
      "sourceRoot": "projects/ui-library/src",
      "prefix": "ui",
      "architect": {
        "build": {
          "builder": "@angular/build:ng-packagr"
        }
      }
    }
  }
}
```

---

## Desarrollo de Componentes

### 1. Crear componentes dentro de una librería
```bash
# Componente básico
ng g c ui/notification --project=ui-library

# Componente con routing
ng g c ui/card --project=ui-library --standalone

# Componente con tests
ng g c ui/button --project=ui-library --standalone --inline-style=false
```

### 2. Crear servicios
```bash
# Servicio en librería
ng g s services/notification --project=ui-library

# Servicio con HTTP
ng g s services/api --project=ui-library
```

### 3. Crear interfaces y modelos
```bash
# Interface
ng g interface models/user --project=ui-library --type=model

# Enum
ng g enum models/status --project=ui-library
```

### 4. Ejemplo de componente moderno
```typescript
// projects/ui-library/src/lib/ui/notification/notification.component.ts
import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'ui-notification',
  standalone: true,
  imports: [],
  template: `
    @if (show()) {
      <div class="notification" [class]="type()">
        <span>{{ message() }}</span>
        <button (click)="close()">×</button>
      </div>
    }
  `
})
export class NotificationComponent {
  message = input.required<string>();
  type = input<'success' | 'error' | 'info'>('info');
  closed = output<void>();
  
  show = signal(true);
  
  close() {
    this.show.set(false);
    this.closed.emit();
  }
}
```

---

## Estructura del Proyecto

### Estructura recomendada para múltiples librerías:
```
library-project/
src/
  app/                          # Aplicación demo
projects/
  ui-library/                   # Librería principal de UI
    src/
      lib/
        ui/
          notification/
          card/
          button/
        services/
          notification.service.ts
        models/
          notification.model.ts
        public-api.ts           # Exportaciones públicas
      package.json              # Configuración de la librería
      ng-package.json           # Configuración de build
      tsconfig.lib.json
      README.md
  
  utils-library/                # Librería de utilidades
    src/
      lib/
        date/
        string/
        validation/
        public-api.ts
  
  shared-library/               # Librería compartida
    src/
      lib/
        interfaces/
        constants/
        types/
        public-api.ts
```

### Configurar public-api.ts
```typescript
// projects/ui-library/src/public-api.ts
export * from './lib/ui/notification/notification.component';
export * from './lib/ui/card/card.component';
export * from './lib/ui/button/button.component';
export * from './lib/services/notification.service';
export * from './lib/models/notification.model';
```

---

## Construcción y Testing

### 1. Construir una librería específica
```bash
ng build ui-library
```

### 2. Construir todas las librerías
```bash
ng build ui-library && ng build utils-library && ng build shared-library
```

### 3. Watch mode para desarrollo
```bash
ng build ui-library --watch
```

### 4. Ejecutar tests
```bash
# Tests de una librería
ng test ui-library

# Tests de todas las librerías
ng test --watch=false --bail=false
```

### 5. Verificar el build
```bash
# Verificar archivos generados
ls -la dist/ui-library/
```

---

## Publicación en NPM

### 1. Configurar package.json de la librería
```json
{
  "name": "@tu-usuario/ui-library",
  "version": "1.0.0",
  "description": "Angular UI Components Library",
  "keywords": ["angular", "ui", "components", "typescript"],
  "author": "Tu Nombre",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/tu-usuario/ui-library.git"
  },
  "peerDependencies": {
    "@angular/common": "^17.0.0",
    "@angular/core": "^17.0.0"
  }
}
```

### 2. Verificar disponibilidad del nombre
```bash
npm view @tu-usuario/ui-library
```

### 3. Construir la librería
```bash
ng build ui-library
```

### 4. Probar localmente
```bash
# Crear paquete local
npm pack ./dist/ui-library

# Instalar en proyecto de prueba
npm install ./ui-library-1.0.0.tgz --save-dev
```

### 5. Publicar en NPM
```bash
# Iniciar sesión en NPM
npm login

# Navegar al directorio de build
cd dist/ui-library

# Publicar
npm publish --access public
```

### 6. Verificar publicación
```bash
npm view @tu-usuario/ui-library
npm info @tu-usuario/ui-library
```

---

## Despliegue Continuo

### 1. Script de publicación automatizada
```json
{
  "scripts": {
    "build:libs": "ng build ui-library && ng build utils-library",
    "test:libs": "ng test ui-library --watch=false --bail=true",
    "publish:ui": "cd dist/ui-library && npm publish --access public",
    "publish:all": "npm run build:libs && npm run publish:ui"
  }
}
```

### 2. GitHub Actions para publicación automática
```yaml
# .github/workflows/publish.yml
name: Publish Library

on:
  push:
    tags:
      - 'v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          registry-url: 'https://registry.npmjs.org'
      
      - run: npm ci
      - run: ng build ui-library
      - run: npm publish ./dist/ui-library --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

---

## Best Practices

### 1. Versionado Semántico
```bash
# Patch (1.0.0 -> 1.0.1)
npm version patch

# Minor (1.0.0 -> 1.1.0)
npm version minor

# Major (1.0.0 -> 2.0.0)
npm version major
```

### 2. Configuración de tsconfig.lib.json
```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "declaration": true,
    "declarationMap": true,
    "inlineSources": true
  },
  "exclude": ["src/test.ts", "**/*.spec.ts"]
}
```

### 3. Configuración de ng-package.json
```json
{
  "$schema": "../../node_modules/ng-packagr/ng-package.schema.json",
  "dest": "../../dist/ui-library",
  "lib": {
    "entryFile": "src/public-api.ts",
    "styleIncludePaths": ["../styles"]
  }
}
```

### 4. Testing de componentes
```typescript
// notification.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotificationComponent]
    });
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show message', () => {
    component.message.set('Test message');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Test message');
  });
});
```

### 5. Documentación de componentes
```typescript
/**
 * Notification component for displaying messages
 * @selector ui-notification
 * @standalone true
 */
@Component({
  selector: 'ui-notification',
  standalone: true,
  template: `
    <div class="notification">
      {{ message() }}
    </div>
  `
})
export class NotificationComponent {
  /** Message to display */
  message = input.required<string>();
  
  /** Type of notification */
  type = input<'success' | 'error' | 'info'>('info');
}
```

---

## Configuración de API Key de YouTube

### Método 1: Variables de Entorno (Recomendado)

Para mantener tu API key segura y no exponerla en el código fuente:

1. **Crear archivo .env**
```bash
# En la raíz del proyecto
touch .env
```

2. **Agregar tu API key**
```env
YOUTUBE_API_KEY=tu_api_key_aqui
```

3. **Configurar app.config.ts**
```typescript
import { ApplicationConfig } from '@angular/core';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'config',
      useValue: {
        apiKey: process.env['YOUTUBE_API_KEY'] || environment.youtubeApiKey,
        showLog: true
      }
    }
  ]
};
```

### Método 2: Archivo de entorno

Para desarrollo rápido, puedes actualizar directamente:

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  youtubeApiKey: 'tu_api_key_aqui'
};
```

### Obtener una API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Ve a **APIs & Services** > **Credentials**
4. Haz clic en **+ CREATE CREDENTIALS** > **API Key**
5. Habilita **YouTube Data API v3** en **APIs & Services** > **Library**
6. Copia tu API key

### Buenas Prácticas

- ✅ **Usa variables de entorno** para producción
- ✅ **Nunca commits tu API key** en el repositorio
- ✅ **Agrega .env a .gitignore**
- ✅ **Usa restricciones de API** para producción (IP, HTTP referer)
- ❌ **No compartas tu API key** públicamente

### Archivo .gitignore

Asegúrate de tener en tu `.gitignore`:
```
# Environment variables
.env
.env.local
.env.production

# API Keys
*.key
```

---

## Comandos Útiles

### Desarrollo
```bash
# Crear nueva librería
ng g lib nombre-libreria --prefix=prefix

# Crear componente en librería
ng g c ui/component-name --project=nombre-libreria

# Crear servicio
ng g s services/service-name --project=nombre-libreria

# Build en watch mode
ng build nombre-libreria --watch

# Ejecutar tests
ng test nombre-libreria
```

### Publicación
```bash
# Verificar nombre disponible
npm view @tu-usuario/nombre-libreria

# Crear paquete para testing
npm pack ./dist/nombre-libreria

# Publicar
cd dist/nombre-libreria && npm publish --access public

# Verificar publicación
npm info @tu-usuario/nombre-libreria
```

---

## Checklist de Publicación

- [ ] Librería construida sin errores
- [ ] Todos los tests pasan
- [ ] package.json configurado correctamente
- [ ] public-api.ts exporta todo lo necesario
- [ ] README.md actualizado
- [ ] Licencia agregada
- [ ] Nombre disponible en NPM
- [ ] Versión actualizada
- [ ] Probar paquete localmente
- [ ] Publicado exitosamente

---

## Recursos Adicionales

- [Angular Library Guide](https://angular.dev/guide/libraries)
- [NPM Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Angular Component Best Practices](https://angular.dev/guide/styleguide)
