import { VIDEOEMBED } from './../constants/urls';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Pipe, inject } from '@angular/core';

@Pipe({
  name: 'youtube',
  standalone: true
})
export class YoutubePipe {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string): SafeResourceUrl {
    if (!value) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl('');
    }

    const videoUrl = `${VIDEOEMBED}${value}?autoplay=1&mute=0&controls=1&rel=0`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(videoUrl);
  }
}
