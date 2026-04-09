
import { Injectable } from '@angular/core';
import { Video } from '../models/video';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  // constructor(private modal: NgbModal) { }

  show(video: Video) {
    // const modalRef = this.modal.open(ModalVideoComponent);
    // modalRef.componentInstance.video = video;
  }
}
