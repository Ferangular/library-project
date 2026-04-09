import { Pipe } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { inject } from '@angular/core';

@Pipe({
  name: 'domSecure',
  standalone: true
})
export class DomSecurePipe {
  private readonly domSanitizer = inject(DomSanitizer);

  transform(value: string, url: string): SafeResourceUrl {
    if (!value || !url) {
      return this.domSanitizer.bypassSecurityTrustResourceUrl('');
    }

    const fullUrl = `${url}${value}`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(fullUrl);
  }
}
