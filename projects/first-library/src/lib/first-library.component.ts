import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-first-library',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './first-library.component.html',
  styleUrl: './first-library.component.css'
})
export class FirstLibraryComponent {
  counter = signal(0);
  doubled = computed(() => this.counter() * 2);
  features = [
    {
      icon: '⚡',
      title: 'Angular Signals',
      description: 'Modern reactive programming with signals'
    },
    {
      icon: '🎨',
      title: 'Modern Design',
      description: 'Beautiful UI with gradients and animations'
    },
    {
      icon: '📱',
      title: 'Responsive Layout',
      description: 'Works perfectly on all device sizes'
    },
    {
      icon: '🔧',
      title: 'TypeScript',
      description: 'Full type safety and IntelliSense support'
    },
    {
      icon: '🚀',
      title: 'Performance',
      description: 'Optimized for speed and efficiency'
    },
    {
      icon: '📚',
      title: 'Educational',
      description: 'Perfect for learning Angular concepts'
    }
  ];

  version = '1.0.0';
  angularVersion = '21.2.5';

  increment() {
    this.counter.update(value => value + 1);
  }

  decrement() {
    this.counter.update(value => value - 1);
  }

  reset() {
    this.counter.set(0);
  }

  isPositive() {
    return this.counter() > 0;
  }


}
