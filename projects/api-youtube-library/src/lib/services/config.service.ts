
import { Injectable, Inject } from '@angular/core';
import { Config } from '../models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  apiKey: string;
  constructor(@Inject('config') private config: Config) {
    this.apiKey = this.config.apiKey;
    if (this.config.showLog) {
      console.log('Api key es: ', this.apiKey);
    }
  }
}
