import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ShortDescriptionPipe } from '../../pipes/short-description.pipe';
import { Video } from '../../models/video';

@Component({
  selector: 'ay-modal-video',
  imports: [],
  templateUrl: './modal-video.html',
  styleUrl: './modal-video.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalVideo {
  readonly video = input.required<Video>();
  // constructor(public modalService: NgbActiveModal) { }
}
