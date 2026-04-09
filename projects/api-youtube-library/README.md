# YouTube API Library para Angular

[![npm version](https://badge.fury.io/js/%40tu-usuario%2Fapi-youtube-library.svg)](https://badge.fury.io/js/%40tu-usuario%2Fapi-youtube-library)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Una librería Angular moderna para integrar la API de YouTube Data v3 con componentes reutilizables, manejo inteligente de cuotas y configuración flexible.

## 🚀 Características

- ✅ **Componentes modernos** con signals y standalone
- ✅ **Manejo inteligente de cuotas** con fallbacks automáticos
- ✅ **Sistema de caché** para reducir llamadas a la API
- ✅ **Búsqueda optimizada** (smart search)
- ✅ **Configuración flexible** de API key
- ✅ **Soporte TypeScript** completo
- ✅ **Diseño responsive** y accesible

## 📦 Instalación

```bash
npm install @tu-usuario/api-youtube-library
```

## 🔧 Configuración Rápida

### 1. Obtener API Key de YouTube

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** > **Credentials** > **+ CREATE CREDENTIALS** > **API Key**
3. Habilita **YouTube Data API v3** en **APIs & Services** > **Library**
4. Copia tu API key

### 2. Configurar en tu Proyecto

Crea un archivo `.env` en la raíz:

```env
YOUTUBE_API_KEY=tu_api_key_aqui
```

### 3. Configurar app.config.ts

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { ApiYoutubeLibraryModule } from '@tu-usuario/api-youtube-library';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    {
      provide: 'config',
      useValue: {
        apiKey: process.env['YOUTUBE_API_KEY'] || 'tu_api_key_aqui',
        showLog: !environment.production
      }
    }
  ]
};
```

## 🎯 Uso Básico

### Importar Módulo

```typescript
import { Component } from '@angular/core';
import { 
  YoutubeBrowser,
  UserSearch,
  PlaylistItems,
  VideoPlayer 
} from '@tu-usuario/api-youtube-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    YoutubeBrowser,
    UserSearch,
    PlaylistItems,
    VideoPlayer
  ],
  template: `
    <div class="container">
      <ay-user-search (channelSelected)="onChannelSelected($event)" />
      
      @if (selectedChannel()) {
        <ay-youtube-browser [channelId]="selectedChannel()?.id" />
      }
    </div>
  `
})
export class AppComponent {
  selectedChannel = signal<any>(null);
  
  onChannelSelected(channel: any) {
    this.selectedChannel.set(channel);
  }
}
```

### Componentes Disponibles

#### 🔍 UserSearch - Búsqueda de Canales

```html
<ay-user-search 
  (channelSelected)="handleChannelSelection($event)"
  placeholder="Buscar canal de YouTube..." />
```

#### 📺 YoutubeBrowser - Navegador de YouTube

```html
<ay-youtube-browser 
  [channelId]="selectedChannelId"
  [maxResults]="25"
  [showThumbnails]="true" />
```

#### 📋 PlaylistItems - Items de Playlist

```html
<ay-playlist-items 
  [playlistId]="selectedPlaylistId"
  [loadMore]="true"
  [itemsPerPage]="10" />
```

#### 🎬 VideoPlayer - Reproductor de Video

```html
<ay-video-player 
  [videoId]="selectedVideoId"
  [autoplay]="false"
  [controls]="true" />
```

#### 📺 Channel - Información del Canal

```html
<ay-channel 
  [channelId]="selectedChannelId"
  [showSubscriberCount]="true" />
```

## 🛠️ API Service

Usa el servicio directamente para control avanzado:

```typescript
import { ApiService } from '@tu-usuario/api-youtube-library';

@Component({...})
export class MyComponent {
  constructor(private api: ApiService) {}
  
  async searchChannels() {
    try {
      const results = await this.api.smartSearchChannels('Fernando Herrera');
      console.log('Canales encontrados:', results);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    }
  }
  
  async getPlaylistItems() {
    try {
      const items = await this.api.getItemsByPlaylist('PLAYLIST_ID');
      console.log('Videos:', items);
    } catch (error) {
      console.error('Error al cargar videos:', error);
    }
  }
}
```

## 🎨 Personalización

### Temas

Los componentes soportan personalización mediante CSS variables:

```css
:root {
  --ay-primary-color: #ff0000;
  --ay-secondary-color: #282828;
  --ay-border-radius: 8px;
  --ay-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
```

### Configuración Avanzada

```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: 'config',
      useValue: {
        apiKey: 'tu_api_key',
        showLog: false,
        maxResults: 50,
        cacheDuration: 30 * 60 * 1000, // 30 minutos
        fallbackChannel: 'UCuaPTYj15JSkETGnEseaFFg' // Fernando Herrera por defecto
      }
    }
  ]
};
```

## 🐛 Manejo de Errores

La librería incluye manejo inteligente de errores:

```typescript
// Errores comunes y soluciones
const errorSolutions = {
  'quotaExceeded': 'Espera 24h o crea nueva API key',
  'forbidden': 'Verifica permisos de la API key',
  'notFound': 'El recurso no existe',
  'invalidKey': 'La API key es inválida'
};
```

## 📊 Optimización de Cuota

La librería optimiza automáticamente:

- **Caché inteligente** para búsquedas repetidas
- **Smart search** prioriza métodos económicos
- **Fallbacks automáticos** cuando fallan endpoints
- **Paginación eficiente** para reducir llamadas

## 🧪 Testing

```bash
# Ejecutar tests
ng test

# Tests con cobertura
ng test --code-coverage

# Tests e2e
ng e2e
```

## 📦 Build y Publicación

```bash
# Construir librería
ng build api-youtube-library

# Construir en modo watch
ng build api-youtube-library --watch

# Publicar en NPM
cd dist/api-youtube-library && npm publish
```

## 🔍 Ejemplos

### Búsqueda de Canales

```typescript
@Component({
  template: `
    <ay-user-search 
      (channelSelected)="onChannelSelected($event)"
      placeholder="Buscar canales..." />
  `
})
export class SearchExample {
  onChannelSelected(channel: any) {
    console.log('Canal seleccionado:', channel);
  }
}
```

### Visualización de Videos

```typescript
@Component({
  template: `
    <ay-playlist-items 
      [playlistId]="playlistId"
      (videoSelected)="onVideoSelected($event)" />
  `
})
export class VideoExample {
  playlistId = 'PLCKuOXG0bPi3VFoG-5EsdfDAbniRmtWt9';
  
  onVideoSelected(video: any) {
    console.log('Video seleccionado:', video);
  }
}
```

## 📚 API Reference

### Interfaces Principales

```typescript
interface Channel {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: Thumbnails;
    subscriberCount: string;
  };
}

interface Playlist {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    thumbnails: Thumbnails;
  };
  contentDetails: {
    itemCount: number;
  };
}

interface PlaylistItem {
  id: string;
  snippet: {
    title: string;
    description: string;
    channelId: string;
    thumbnails: Thumbnails;
  };
  contentDetails: {
    videoId: string;
    videoPublishedAt: string;
  };
}
```

### Métodos del Servicio

```typescript
class ApiService {
  // Búsqueda inteligente de canales
  smartSearchChannels(query: string): Observable<SearchResponse['items']>
  
  // Obtener información del canal
  getUserChannelInfo(channelId: string): Observable<Channel['items'][0]['snippet']>
  
  // Obtener playlists del canal
  getLastPlaylistAddByUserChannel(channelId: string): Observable<Playlist>
  
  // Obtener videos de playlist
  getItemsByPlaylist(playlistId: string, loadMore?: boolean): Observable<Item[]>
  
  // Limpiar caché
  clearSearchCache(): void
  
  // Resetear estado de playlist
  resetPlaylistState(): void
}
```

## 🤝 Contribución

1. Fork este repositorio
2. Crea tu feature branch (`git checkout -b feature/amazing-feature`)
3. Commit tus cambios (`git commit -m 'Add amazing feature'`)
4. Push al branch (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🙏 Agradecimientos

- YouTube Data API v3
- Equipo de Angular
- Comunidad de desarrolladores

## 📞 Soporte

- 📧 Email: soporte@ejemplo.com
- 🐛 Issues: [GitHub Issues](https://github.com/tu-usuario/api-youtube-library/issues)
- 📖 Documentación: [Wiki](https://github.com/tu-usuario/api-youtube-library/wiki)

## 🗺️ Roadmap

- [ ] Soporte para YouTube Live Streaming
- [ ] Componente de comentarios
- [ ] Sistema de favoritos
- [ ] Modo offline con caché persistente
- [ ] Soporte para múltiples idiomas

---

**Hecho con ❤️ para la comunidad de Angular**
