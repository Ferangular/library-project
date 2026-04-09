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

      this.resetState();
      this.loadPlaylist(playlistId, false);
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
      id: video.snippet.resourceId.videoId,
      title: video.snippet.title,
      description: video.snippet.description,
    };

    this.modal.show(videoItem);
  }

  private loadPlaylist(playlistId: string, loadMore: boolean): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.api.getItemsByPlaylist(playlistId, loadMore).subscribe({
      next: () => {
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los vídeos.');
        this.isLoading.set(false);
      },
    });
  }

  private resetState(): void {
    this.videos.set([]);
    this.error.set(null);
  }
}
