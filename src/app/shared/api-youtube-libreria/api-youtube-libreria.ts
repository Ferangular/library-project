import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Channel, PlaylistItemsComponent, VideoPlayer } from '../../../../projects/api-youtube-library/src/public-api';



@Component({
  selector: 'app-api-youtube-libreria',
  imports: [Channel, PlaylistItemsComponent, VideoPlayer],
  templateUrl: './api-youtube-libreria.html',
  styleUrl: './api-youtube-libreria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiYoutubeLibreria {}
