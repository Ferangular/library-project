import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationServiceTs } from '../../services/notification.service.ts';

@Component({
  selector: 'lib-notification',
  imports: [],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Notification {
  private readonly notificationService = inject(NotificationServiceTs);

  readonly notification = this.notificationService.state;

  hide(): void {
    this.notificationService.hide();
  }
}
