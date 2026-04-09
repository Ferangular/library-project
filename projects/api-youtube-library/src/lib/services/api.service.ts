import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { API } from './../constants/urls';
import { ConfigService } from './config.service';

import { Channel } from '../models/api/channel.interface';
import { Item, PlaylistItems } from '../models/api/playlis-items.interface';
import { Playlist } from '../models/api/playlist.interface';
import { SearchResponse } from '../models/api/search.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly config = inject(ConfigService);
  private readonly http = inject(HttpClient);

  readonly info = 'part=id,snippet,contentDetails';

  readonly pageToken = signal('');
  readonly playlistVideos = signal<Item[]>([]);

  private readonly CACHE_DURATION = 30 * 60 * 1000;
  private readonly searchCache = new Map<string, SearchResponse['items']>();
  private readonly cacheTimestamps = new Map<string, number>();

  private buildUrl(path: string, params: Record<string, string | number | undefined>): string {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        query.set(key, String(value));
      }
    });

    query.set('key', this.config.apiKey);

    return `${API}${path}?${query.toString()}`;
  }

  private mapChannelsToSearchItems(channels: Channel['items']): SearchResponse['items'] {
    return channels.map((channel) => ({
      kind: 'youtube#searchResult',
      etag: channel.etag,
      id: {
        kind: 'youtube#channel',
        channelId: channel.id,
      },
      snippet: {
        publishedAt: channel.snippet.publishedAt,
        channelId: channel.id,
        title: channel.snippet.title,
        description: channel.snippet.description,
        thumbnails: channel.snippet.thumbnails,
        channelTitle: channel.snippet.title,
        liveBroadcastContent: 'none',
      },
    }));
  }

  private getCachedSearch(query: string): SearchResponse['items'] | null {
    const key = query.trim().toLowerCase();
    const timestamp = this.cacheTimestamps.get(key);

    if (!timestamp) {
      return null;
    }

    const isValid = Date.now() - timestamp < this.CACHE_DURATION;
    if (!isValid) {
      this.searchCache.delete(key);
      this.cacheTimestamps.delete(key);
      return null;
    }

    return this.searchCache.get(key) ?? null;
  }

  private setCachedSearch(query: string, items: SearchResponse['items']): void {
    const key = query.trim().toLowerCase();
    this.searchCache.set(key, items);
    this.cacheTimestamps.set(key, Date.now());
  }

  private isChannelId(value: string): boolean {
    return /^UC[\w-]{22}$/.test(value.trim());
  }

  private isHandle(value: string): boolean {
    return value.trim().startsWith('@');
  }

  getUserChannelInfo(channelId: string): Observable<Channel['items'][0]['snippet']> {
    return this.getChannelById(channelId).pipe(
      map((channel) => {
        if (!channel) {
          throw new Error('No channel found');
        }
        return channel.snippet;
      })
    );
  }

  getChannelById(channelId: string): Observable<Channel['items'][0] | null> {
    const url = this.buildUrl('channels', {
      part: 'id,snippet,contentDetails',
      id: channelId,
    });

    console.log('DEBUG: getChannelById URL:', url);

    return this.http.get<Channel>(url).pipe(
      map((res) => res.items?.[0] ?? null),
      catchError((error) => {
        console.error('DEBUG: getChannelById error:', error);
        return of(null);
      })
    );
  }

  getChannelByHandle(handle: string): Observable<Channel['items']> {
    const normalizedHandle = handle.startsWith('@') ? handle : `@${handle}`;

    const url = this.buildUrl('channels', {
      part: 'id,snippet,contentDetails',
      forHandle: normalizedHandle,
    });

    console.log('DEBUG: getChannelByHandle URL:', url);

    return this.http.get<Channel>(url).pipe(
      map((res) => res.items ?? []),
      catchError((error) => {
        console.error('DEBUG: getChannelByHandle error:', error);
        return of([]);
      })
    );
  }

  getChannelByUsername(username: string): Observable<Channel['items']> {
    const url = this.buildUrl('channels', {
      part: 'id,snippet,contentDetails',
      forUsername: username,
    });

    console.log('DEBUG: getChannelByUsername URL:', url);

    return this.http.get<Channel>(url).pipe(
      map((res) => res.items ?? []),
      catchError((error) => {
        console.error('DEBUG: getChannelByUsername error:', error);
        return of([]);
      })
    );
  }

  searchChannels(query: string): Observable<SearchResponse['items']> {
    const cleanQuery = query.trim();
    const cached = this.getCachedSearch(cleanQuery);

    if (cached) {
      console.log('DEBUG: using cached search for:', cleanQuery);
      return of(cached);
    }

    const url = this.buildUrl('search', {
      part: 'snippet',
      q: cleanQuery,
      type: 'channel',
      maxResults: 10,
    });

    console.log('DEBUG: searchChannels URL:', url);

    return this.http.get<SearchResponse>(url).pipe(
      map((res) => {
        const items = res.items ?? [];
        this.setCachedSearch(cleanQuery, items);
        return items;
      })
    );
  }

  smartSearchChannels(query: string): Observable<SearchResponse['items']> {
    const cleanQuery = query.trim();

    if (!cleanQuery) {
      return of([]);
    }

    const cached = this.getCachedSearch(cleanQuery);
    if (cached) {
      return of(cached);
    }

    if (this.isChannelId(cleanQuery)) {
      return this.getChannelById(cleanQuery).pipe(
        map((channel) => {
          const items = channel ? this.mapChannelsToSearchItems([channel]) : [];
          this.setCachedSearch(cleanQuery, items);
          return items;
        })
      );
    }

    if (this.isHandle(cleanQuery)) {
      return this.getChannelByHandle(cleanQuery).pipe(
        map((channels) => {
          const items = this.mapChannelsToSearchItems(channels);
          this.setCachedSearch(cleanQuery, items);
          return items;
        })
      );
    }

    return this.getChannelByUsername(cleanQuery).pipe(
      switchMap((channels) => {
        if (channels.length > 0) {
          const items = this.mapChannelsToSearchItems(channels);
          this.setCachedSearch(cleanQuery, items);
          return of(items);
        }

        return this.searchChannels(cleanQuery).pipe(
          catchError((error) => {
            console.error('DEBUG: smartSearchChannels fallback search error:', error);
            return throwError(() => error);
          })
        );
      })
    );
  }

  getLastPlaylistAddByUserChannel(channelId: string): Observable<Playlist> {
    const url = this.buildUrl('playlists', {
      part: 'id,snippet,contentDetails',
      channelId,
      maxResults: 9,
    });

    console.log('DEBUG: getLastPlaylistAddByUserChannel URL:', url);

    return this.http.get<Playlist>(url);
  }

  getItemsByPlaylist(playlistId: string, loadMore = false): Observable<Item[]> {
    this.resetPlaylistStateIfNeeded(playlistId);

    const currentToken = this.pageToken();
    const pageToken = loadMore && currentToken ? currentToken : undefined;

    const url = this.buildUrl('playlistItems', {
      part: 'id,snippet,contentDetails',
      playlistId,
      maxResults: 9,
      pageToken,
    });

    console.log('DEBUG: getItemsByPlaylist URL:', url);

    return this.http.get<PlaylistItems>(url).pipe(
      map((res) => {
        this.pageToken.set(res.nextPageToken ?? '');

        const incomingItems = res.items ?? [];
        const updatedVideos = loadMore
          ? [...this.playlistVideos(), ...incomingItems]
          : incomingItems;

        this.playlistVideos.set(updatedVideos);
        return updatedVideos;
      }),
      catchError((error) => {
        console.error('DEBUG: getItemsByPlaylist error:', error);
        return throwError(() => error);
      })
    );
  }

  resetPlaylistState(): void {
    this.playlistVideos.set([]);
    this.pageToken.set('');
  }

  clearSearchCache(): void {
    this.searchCache.clear();
    this.cacheTimestamps.clear();
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
