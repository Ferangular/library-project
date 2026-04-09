
import { map } from 'rxjs/operators';
import { API } from './../constants/urls';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';
import { inject, Injectable, signal } from '@angular/core';
import { Item, PlaylistItems } from '../models/api/playlis-items.interface';
import { Channel } from '../models/api/channel.interface';
import { Playlist } from '../models/api/playlist.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient);

  readonly info = 'part=id%2Csnippet%2CcontentDetails';

  readonly pageToken = signal<string>('');
  readonly playlistVideos = signal<Item[]>([]);

  private getUrl(request: string): string {
    return `${API}${request}&maxResults=9&key=${this.config.apiKey}`;
  }

  getUserChannelInfo(user: string): Observable<Channel['items'][0]['snippet']> {
    return this.http
      .get<Channel>(this.getUrl(`channels?${this.info}&id=${user}`))
      .pipe(
        map((res: Channel) => res.items[0].snippet)
      );
  }

  getLastPlaylistAddByUserChannel(user: string): Observable<Playlist> {
    return this.http
      .get<Playlist>(this.getUrl(`playlists?${this.info}&channelId=${user}`))
      .pipe(
        map((res: Playlist) => res)
      );
  }

  getItemsByPlaylist(playlistId: string, loadMore = false): Observable<Item[]> {
    this.resetPlaylistStateIfNeeded(playlistId);

    const tokenParam =
      loadMore && this.pageToken()
        ? `&pageToken=${this.pageToken()}`
        : '';

    return this.http
      .get<PlaylistItems>(
        this.getUrl(
          `playlistItems?${this.info}&playlistId=${playlistId}${tokenParam}`
        )
      )
      .pipe(
        map((res: PlaylistItems) => {
          this.pageToken.set(res.nextPageToken ?? 'OK');

          const updatedVideos = loadMore
            ? [...this.playlistVideos(), ...res.items]
            : [...res.items];

          this.playlistVideos.set(updatedVideos);

          return updatedVideos;
        })
      );
  }

  resetPlaylistState(): void {
    this.playlistVideos.set([]);
    this.pageToken.set('');
  }

  private resetPlaylistStateIfNeeded(playlistId: string): void {
    const currentVideos = this.playlistVideos();

    if (
      currentVideos.length > 0 &&
      currentVideos[0].snippet.playlistId !== playlistId
    ) {
      this.resetPlaylistState();
    }
  }
}
