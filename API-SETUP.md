# Configuración de API Key de YouTube

## Problema Actual
La aplicación está mostrando errores de permisos porque la API key actual no tiene los permisos necesarios para acceder a todos los endpoints de YouTube Data API v3.

## Solución

### 1. Crear una nueva API Key

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Selecciona tu proyecto o crea uno nuevo
3. Ve a **APIs & Services** > **Credentials**
4. Haz clic en **+ CREATE CREDENTIALS** > **API Key**
5. Copia la API key generada

### 2. Habilitar YouTube Data API v3

1. Ve a **APIs & Services** > **Library**
2. Busca "YouTube Data API v3"
3. Haz clic en **Enable**

### 3. Configurar la API Key

1. En la página de **Credentials**, haz clic en tu API key
2. **IMPORTANTE**: En "Application restrictions", selecciona **None** (sin restricciones) para desarrollo
3. En "API restrictions", selecciona **Restrict key** y elige **YouTube Data API v3**
4. Haz clic en **Save**

### 4. Configurar en el Proyecto

#### Opción A: Variable de Entorno (Recomendado)
```bash
# En tu terminal
export YOUTUBE_API_KEY=tu_nueva_api_key_aqui
```

#### Opción B: Archivo .env
Crea un archivo `.env` en la raíz del proyecto:
```
YOUTUBE_API_KEY=tu_nueva_api_key_aqui
```

#### Opción C: Actualizar environment.ts
```typescript
export const environment = {
  production: false,
  youtubeApiKey: 'tu_nueva_api_key_aqui'
};
```

### 5. Reiniciar la Aplicación
```bash
ng serve
```

## Verificación

La aplicación debería ahora poder:
- Buscar canales
- Obtener playlists
- Cargar videos de las playlists

## Notas Importantes

- **Nunca compartas tu API key públicamente**
- **Para producción**: Configura restricciones de IP o HTTP Referer
- **Cuotas**: YouTube Data API tiene límites de cuota diarios
- **Costo**: YouTube Data API v3 tiene un generoso tier gratuito, pero puede generar costos si excedes las cuotas

## Troubleshooting

### Error 403: Forbidden
- Verifica que la API key esté habilitada para YouTube Data API v3
- Revisa las restricciones de la API key

### Error 400: Bad Request
- Verifica que la API key sea válida
- Revisa el formato de las solicitudes

### Cuota excedida
- Espera a que se resetee la cuota diaria
- Considera optimizar las llamadas a la API

## Enlaces Útiles

- [Google Cloud Console](https://console.cloud.google.com/)
- [YouTube Data API v3 Documentation](https://developers.google.com/youtube/v3)
- [API Key Best Practices](https://cloud.google.com/docs/authentication/api-keys#best_practices)
