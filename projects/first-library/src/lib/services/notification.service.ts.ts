import { Injectable, signal } from '@angular/core';
import { NotificationState } from '../models/notification-state.interface.ts';

const INITIAL_STATE: NotificationState = {
  message: '',
  type: 'info',
  visible: false,
};

@Injectable({
  providedIn: 'root',
})
export class NotificationServiceTs {
  private readonly stateSignal = signal<NotificationState>(INITIAL_STATE);

  readonly state = this.stateSignal.asReadonly();

  showSuccess(message: string): void {
    this.stateSignal.set({
      message,
      type: 'success',
      visible: true,
    });
  }

  showError(message: string): void {
    this.stateSignal.set({
      message,
      type: 'error',
      visible: true,
    });
  }

  showInfo(message: string): void {
    this.stateSignal.set({
      message,
      type: 'info',
      visible: true,
    });
  }

  hide(): void {
    this.stateSignal.set({
      ...this.stateSignal(),
      visible: false,
    });
  }
}
