import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { Item } from '../../models/api/playlis-items.interface';
import { ApiService, ModalService } from '../../services';
import { Video } from '../../models/video';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { DateHourPipe } from '../../pipes/date-hour.pipe';

@Component({
  selector: 'ay-playlist-items',
  imports: [ShortDescriptionPipe, DateHourPipe],
  templateUrl: './playlist-items.html',
  styleUrl: './playlist-items.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistItems {
  private readonly api = inject(ApiService);
  private readonly modal = inject(ModalService);

  readonly playlistId = input<string>('');
  
  private currentPlaylistId = signal<string>('');

  readonly videos = signal<Item[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly resolvedPlaylistId = computed(
    () => this.playlistId()?.trim() || 'UUTh7-deUJBNv2tHRiMGcXxg'
  );

  readonly hasVideos = computed(() => this.videos().length > 0);
  readonly noMoreVideos = computed(() => this.api.pageToken() === 'OK');

  constructor() {
    effect(() => {
      const playlistId = this.resolvedPlaylistId();
      const currentId = this.currentPlaylistId();

      console.log('DEBUG: Effect triggered - PlaylistId:', playlistId, 'CurrentId:', currentId);
      console.log('DEBUG: Current videos count:', this.videos().length);
      console.log('DEBUG: Has videos:', this.hasVideos());

      if (playlistId !== currentId) {
        console.log('DEBUG: Playlist ID changed from', currentId, 'to', playlistId);
        this.currentPlaylistId.set(playlistId);
        this.resetState();
        this.loadPlaylist(playlistId, false);
      } else {
        console.log('DEBUG: Playlist ID unchanged, skipping reload');
      }
    });
  }

  loadMore(): void {
    if (this.isLoading() || this.noMoreVideos()) {
      return;
    }

    this.loadPlaylist(this.resolvedPlaylistId(), true);
  }

  showVideo(video: Item): void {
    const videoItem: Video = {
      id: video.contentDetails.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
    };

    this.modal.show(videoItem);
  }

  private loadPlaylist(playlistId: string, loadMore: boolean): void {
    console.log('DEBUG: loadPlaylist called with:', { playlistId, loadMore });
    this.isLoading.set(true);
    this.error.set(null);

    this.api.getItemsByPlaylist(playlistId, loadMore).subscribe({
      next: (videos) => {
        console.log('DEBUG: Videos received in component:', videos);
        this.videos.set(videos);
        this.isLoading.set(false);
        console.log('DEBUG: Component state - Videos:', this.videos().length, 'Loading:', this.isLoading(), 'Error:', this.error());
      },
      error: (err) => {
        console.log('DEBUG: Playlist error:', err);
        console.log('DEBUG: Playlist error status:', err.status);
        console.log('DEBUG: Playlist error message:', err.message);
        console.log('DEBUG: Playlist error URL:', err.url);
        
        let errorMessage = 'No se pudieron cargar los vídeos.';
        if (err.status === 403) {
          errorMessage = 'Error de permisos: Revisa tu API key de YouTube.';
        } else if (err.status === 404) {
          errorMessage = 'Playlist no encontrada.';
        } else if (err.status === 0) {
          errorMessage = 'Error de conexión: Revisa tu internet.';
        }
        
        this.error.set(errorMessage);
        this.isLoading.set(false);
      },
    });
  }

  private resetState(): void {
    console.log('DEBUG: Resetting state - clearing videos and errors');
    this.videos.set([]);
    this.error.set(null);
  }
}
