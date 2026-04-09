import { ChangeDetectionStrategy, Component } from '@angular/core';
import { YoutubeBrowser } from '../../../../projects/api-youtube-library/src/public-api';

@Component({
  selector: 'app-api-youtube-libreria',
  imports: [YoutubeBrowser],
  templateUrl: './api-youtube-libreria.html',
  styleUrl: './api-youtube-libreria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiYoutubeLibreria {
}
