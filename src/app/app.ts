import { Component } from '@angular/core';
import { ApiYoutubeLibreria } from './shared/api-youtube-libreria/api-youtube-libreria';

@Component({
  selector: 'app-root',
  imports: [ApiYoutubeLibreria],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
