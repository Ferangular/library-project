import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { UserSearch } from '../user-search/user-search';
import { Channel } from '../channel/channel';
import { PlaylistItems } from '../playlist-items/playlist-items';


@Component({
  selector: 'ay-youtube-browser',
  imports: [UserSearch, Channel, PlaylistItems],
  templateUrl: './youtube-browser.html',
  styleUrl: './youtube-browser.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class YoutubeBrowser {
  readonly selectedChannel = signal<{id: string, title: string} | null>(null);
  readonly selectedPlaylist = signal<string | null>(null);

  readonly channelId = computed(() => this.selectedChannel()?.id || '');
  readonly playlistId = computed(() => this.selectedPlaylist() || '');

  onChannelSelected(channel: {id: string, title: string}) {
    this.selectedChannel.set(channel);
    this.selectedPlaylist.set(null); // Reset playlist when channel changes
  }

  onPlaylistSelected(playlistId: string) {
    this.selectedPlaylist.set(playlistId);
  }

  clearAll() {
    this.selectedChannel.set(null);
    this.selectedPlaylist.set(null);
  }
}
