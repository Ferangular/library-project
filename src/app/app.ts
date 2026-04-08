import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstLibrary } from 'first-library';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstLibrary],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('library-project');
}
