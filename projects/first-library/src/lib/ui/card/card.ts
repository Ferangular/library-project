import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-card',
  standalone: true,
  templateUrl: './card.html',
  styleUrls: ['./card.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
})
export class Card {
  title = input<string>('');
  subtitle = input<string>('');
}
