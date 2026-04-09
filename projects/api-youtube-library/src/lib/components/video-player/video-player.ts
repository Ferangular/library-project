import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { YoutubePipe } from '../../pipes/youtube.pipe';

@Component({
  selector: 'ay-video-player',
  imports: [YoutubePipe],
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayer {
  id = input.required<string>();
}
