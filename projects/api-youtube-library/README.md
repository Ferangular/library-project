# ApiYouTubeLibrary

Una librería Angular para integrar la API de YouTube Data v3 con componentes reutilizables para video player, modales y más.

## Configuración de API Key

### Paso 1: Obtener tu API Key de YouTube

Para usar esta librería necesitas una API key de YouTube Data API v3. Sigue estos pasos:

1. **Ve a Google Cloud Console**:
   - [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - [Acceso directo a APIs](https://console.cloud.google.com/apis/api/youtube.googleapis.com/metrics?hl=es-419&project=curso-crear-libreria&supportedpurview=project)
   - Inicia sesión con tu cuenta de Google

2. **Crea un nuevo proyecto** (o selecciona uno existente):
   - Haz click en el selector de proyectos en la parte superior
   - Click en "NUEVO PROYECTO"
   - Dale un nombre y haz click en "CREAR"

3. **Habilita YouTube Data API v3**:
   - En el menú izquierdo, ve a **"APIs y servicios"** > **"Biblioteca"**
   - Busca **"YouTube Data API v3"**
   - Haz click en ella y luego en **"Habilitar"**

4. **Crea credenciales**:
   - En el menú izquierdo, ve a **"APIs y servicios"** > **"Credenciales"**
   - Haz click en **"+ CREAR CREDENCIALES"**
   - Selecciona **"Clave de API"**
   - Copia la clave generada

5. **Configura la clave** (opcional pero recomendado):
   - Haz click en la clave recién creada
   - En "Restricciones de API", selecciona "YouTube Data API v3"
   - En "Restricciones de aplicación", selecciona "Referencias HTTP" y añade tu dominio

### Paso 2: Configurar en tu proyecto

1. **Crea el archivo de entorno**:
   ```bash
   # Copia el template
   cp src/environments/.env.example .env
   ```

2. **Edita el archivo `.env`**:
   ```env
   YOUTUBE_API_KEY=tu_api_key_aqui
   ```

3. **Asegúrate que `.env` esté en `.gitignore`**:
   ```gitignore
   # Environment files
   .env
   .env.local
   .env.production
   ```

### Paso 3: Verificar la configuración

La API key se cargará automáticamente desde las variables de entorno en `app.config.ts`. Puedes verificar que funciona revisando la consola del navegador (si `showLog` está en `true`).

## Enlaces útiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [YouTube Data API v3 Documentation](https://developers.google.com/youtube/v3)
- [Panel de APIs](https://console.cloud.google.com/apis/api/youtube.googleapis.com/metrics)

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
ng g c components/modal-video --project=api-youtube-library --style=scss
ng g c components/playlist-items --project=api-youtube-library --style=scss
ng g c components/user-last-playlist --project=api-youtube-library --style=scss
ng g c components/video-player --project=api-youtube-library --style=scss
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the library, run:

```bash
ng build api-youtube-library
```

This command will compile your project, and the build artifacts will be placed in the `dist/` directory.

### Publishing the Library

Once the project is built, you can publish your library by following these steps:

1. Navigate to the `dist` directory:

   ```bash
   cd dist/api-youtube-library
   ```

2. Run the `npm publish` command to publish your library to the npm registry:
   ```bash
   npm publish
   ```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
