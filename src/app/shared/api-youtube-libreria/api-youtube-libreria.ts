import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Channel, PlaylistItemsComponent, VideoPlayer, ModalTrigger } from '../../../../projects/api-youtube-library/src/public-api';

@Component({
  selector: 'app-api-youtube-libreria',
  imports: [Channel, PlaylistItemsComponent, VideoPlayer, ModalTrigger],
  templateUrl: './api-youtube-libreria.html',
  styleUrl: './api-youtube-libreria.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiYoutubeLibreria {
  sampleVideo = {
    id: '9bWfmYokexY',
    title: 'Sample YouTube Video',
    description: 'This is a sample video description for testing the modal functionality. The modal should display the video player and show this description truncated to 250 characters if it\'s longer than that.'
  };
}
