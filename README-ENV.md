# Configuración Segura de API Key

## Archivos de Configuración

### 1. Archivos de Entorno
- `src/environments/environment.ts` - Desarrollo
- `src/environments/environment.prod.ts` - Producción
- `.env` - Variables de entorno (no subido a git)

### 2. Seguridad
- `.env` está en `.gitignore` para no subir la API key
- `src/environments/.env.example` - Template para otros desarrolladores

### 3. Uso
La API key se inyecta automáticamente desde las variables de entorno en `app.config.ts`.

### 4. Para otros desarrolladores:
1. Copiar `src/environments/.env.example` a `.env`
2. Reemplazar con su propia API key
3. No subir `.env` al repositorio

## Importante
- Nunca subir archivos `.env` al repositorio
- Usar diferentes API keys para desarrollo y producción
- Rotar las API keys periódicamente
