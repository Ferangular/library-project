import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { VideoPlayer } from '../video-player/video-player';
import { Video } from '../../models/video';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'ay-modal-video',
  imports: [ShortDescriptionPipe, VideoPlayer],
  templateUrl: './modal-video.html',
  styleUrl: './modal-video.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalVideo {
  readonly video = input.required<Video>();
  private modalService = inject(ModalService);

  close() {
    this.modalService.close();
  }

  onBackdropClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.close();
    }
  }
}
