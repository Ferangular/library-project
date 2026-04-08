import { Component, inject, signal } from '@angular/core';
import { Card } from '../../projects/first-library/src/lib/ui/card/card';
import { NotificationServiceTs } from '../../projects/first-library/src/lib/services/notification.service.ts';
import { Notification } from '../../projects/first-library/src/lib/ui/notification/notification';
import { Button } from '../../projects/first-library/src/lib/ui/button/button';


@Component({
  selector: 'app-root',
  imports: [Card, Notification, Button],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly notificationService = inject(NotificationServiceTs);

  showSuccess(): void {
    this.notificationService.showSuccess('Operación realizada correctamente');
  }

  showError(): void {
    this.notificationService.showError('Se ha producido un error');
  }

  hideNotification(): void {
    this.notificationService.hide();
  }

  showInfo(): void {
    this.notificationService.showInfo('Información enviada desde la librería');
  }

  get notification() {
    return this.notificationService.state;
  }
}
