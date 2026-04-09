import { ChangeDetectionStrategy, Component, input, inject } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { Video } from '../../models/video';

@Component({
  selector: 'ay-modal-trigger',
  templateUrl: './modal-trigger.html',
  styleUrl: './modal-trigger.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalTrigger {
  private modalService = inject(ModalService);
  
  video = input.required<Video>();
  buttonText = input<string>('Open Video');
  
  openModal() {
    this.modalService.show(this.video());
  }
}
