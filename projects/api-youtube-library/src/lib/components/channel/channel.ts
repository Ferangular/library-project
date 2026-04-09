import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
  DestroyRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';

import { Snippet } from '../../models/api/channel.interface';
import { ApiService } from '../../services';
import { DateHourPipe } from '../../pipes/date-hour.pipe';

@Component({
  selector: 'ay-channel',
  standalone: true,
  imports: [DateHourPipe],
  templateUrl: './channel.html',
  styleUrl: './channel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Channel {
  private readonly api = inject(ApiService);
  private readonly destroyRef = inject(DestroyRef);

  // INPUT
  readonly channelId = input<string>('');

  // STATE
  private readonly currentChannelId = signal<string>('');

  readonly channel = signal<Snippet | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  // DERIVED STATE
  readonly resolvedChannelId = computed(
    () => this.channelId()?.trim() || 'UCuaPTYj15JSkETGnEseaFFg'
  );

  readonly hasChannel = computed(() => this.channel() !== null);

  constructor() {
    effect(() => {
      const channelId = this.resolvedChannelId();
      const currentId = this.currentChannelId();

      if (channelId !== currentId) {
        console.log('DEBUG: Channel ID changed from', currentId, 'to', channelId);

        this.currentChannelId.set(channelId);
        this.loadChannel(channelId);
      }
    });
  }

  private loadChannel(channelId: string): void {
    console.log('DEBUG: Loading channel:', channelId);

    this.isLoading.set(true);
    this.error.set(null);
    this.channel.set(null);

    this.api
      .getUserChannelInfo(channelId)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        catchError((err) => {
          console.log('DEBUG: Channel error:', err);

          let errorMessage = 'No se pudo cargar la información del canal.';

          if (err?.error?.error?.errors?.[0]?.reason === 'quotaExceeded') {
            errorMessage = 'Se agotó la cuota de la API de YouTube.';
          } else if (err?.status === 403) {
            errorMessage = 'Error de permisos: revisa tu API key de YouTube.';
          } else if (err?.status === 404) {
            errorMessage = 'Canal no encontrado.';
          } else if (err?.status === 0) {
            errorMessage = 'Error de conexión: revisa tu internet.';
          }

          this.error.set(errorMessage);

          return of(null);
        }),
        finalize(() => {
          this.isLoading.set(false);
        })
      )
      .subscribe((data) => {
        if (!data) return;

        console.log('DEBUG: Channel data received:', data);
        console.log('DEBUG: Channel thumbnails:', data.thumbnails);

        this.channel.set(data);
      });
  }
}
