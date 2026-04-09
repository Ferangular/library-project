
import { Injectable } from '@angular/core';
import { Video } from '../models/video';
import { ComponentRef, ApplicationRef } from '@angular/core';
import { createComponent } from '@angular/core';
import { ModalVideo } from '../components/modal-video/modal-video';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalComponentRef: ComponentRef<ModalVideo> | null = null;

  constructor(private appRef: ApplicationRef) {}

  show(video: Video) {
    if (this.modalComponentRef) {
      this.close();
    }

    const componentRef = createComponent(ModalVideo, {
      environmentInjector: this.appRef.injector,
    });

    // Set the video input
    componentRef.setInput('video', video);
    
    // Add to DOM
    document.body.appendChild(componentRef.location.nativeElement);
    this.appRef.attachView(componentRef.hostView);
    
    this.modalComponentRef = componentRef;
  }

  close() {
    if (this.modalComponentRef) {
      this.appRef.detachView(this.modalComponentRef.hostView);
      this.modalComponentRef.destroy();
      this.modalComponentRef = null;
    }
  }
}
