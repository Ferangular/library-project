import { ChangeDetectionStrategy, Component, inject, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ApiService } from '../../services';
import { SearchResponse } from '../../models/api/search.interface';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';

@Component({
  selector: 'ay-user-search',
  imports: [FormsModule, ShortDescriptionPipe],
  templateUrl: './user-search.html',
  styleUrl: './user-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearch {
  private readonly api = inject(ApiService);

  searchQuery = signal('');
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly searchResults = signal<SearchResponse['items']>([]);
  readonly selectedChannel = signal<{ id: string; title: string } | null>(null);

  readonly channelSelected = output<{ id: string; title: string }>();

  onSearch() {
    const query = this.searchQuery().trim();
    if (!query) {
      this.error.set('Por favor, ingresa un nombre de canal o usuario');
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);
    this.searchResults.set([]);

    // Smart search: tries cheaper methods first
    this.api.smartSearchChannels(query).subscribe({
      next: (results) => {
        this.searchResults.set(results);
        this.isLoading.set(false);

        if (results.length === 0) {
          // Seleccionar Fernando Herrera por defecto cuando no se encuentran resultados
          this.selectFernandoHerrera();
        }
      },
      error: (err) => {
        console.error('Search error:', err);
        
        // En caso de error, seleccionar Fernando Herrera por defecto
        this.selectFernandoHerrera();
        this.isLoading.set(false);
      },
    });
  }

  selectChannel(channel: SearchResponse['items'][0]) {
    const selectedData = {
      id: channel.id.channelId || '',
      title: channel.snippet.channelTitle,
    };

    this.selectedChannel.set(selectedData);
    this.channelSelected.emit(selectedData);
    this.searchResults.set([]);
    this.searchQuery.set('');
  }

  clearSelection() {
    this.selectedChannel.set(null);
  }

  selectFernandoHerrera() {
    const fernandoHerrera = {
      id: 'UCuaPTYj15JSkETGnEseaFFg',
      title: 'Fernando Herrera'
    };

    this.selectedChannel.set(fernandoHerrera);
    this.channelSelected.emit(fernandoHerrera);
    this.searchResults.set([]);
    this.searchQuery.set('Fernando Herrera');
    this.error.set(null);
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }
}
