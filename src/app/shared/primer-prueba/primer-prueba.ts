import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Button } from '../../../../projects/first-library/src/lib/ui/button/button';
import { Card } from '../../../../projects/first-library/src/lib/ui/card/card';
import { Notification } from '../../../../projects/first-library/src/lib/ui/notification/notification';
import { NotificationServiceTs } from '../../../../projects/first-library/src/lib/services/notification.service.ts';

@Component({
  selector: 'app-primer-prueba',
  imports: [Button, Card, Notification],
  templateUrl: './primer-prueba.html',
  styleUrl: './primer-prueba.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrimerPrueba {
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
