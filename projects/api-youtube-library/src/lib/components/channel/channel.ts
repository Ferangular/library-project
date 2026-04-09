import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { Snippet } from '../../models/api/channel.interface';
import { ApiService } from '../../services';
import { DateHourPipe } from '../../pipes/date-hour.pipe';

@Component({
  selector: 'ay-channel',
  imports: [DateHourPipe],
  templateUrl: './channel.html',
  styleUrl: './channel.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Channel {
  private readonly api = inject(ApiService);

  readonly channelId = input<string>('');

  readonly channel = signal<Snippet | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly resolvedChannelId = computed(
    () => this.channelId()?.trim() || 'UCTh7-deUJBNv2tHRiMGcXxg'
  );

  readonly hasChannel = computed(() => this.channel() !== null);

  constructor() {
    effect(() => {
      const channelId = this.resolvedChannelId();
      this.loadChannel(channelId);
    });
  }

  private loadChannel(channelId: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.channel.set(null);

    this.api.getUserChannelInfo(channelId).subscribe({
      next: (data: Snippet) => {
        this.channel.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la información del canal.');
        this.isLoading.set(false);
      },
    });
  }
}
