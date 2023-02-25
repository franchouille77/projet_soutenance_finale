import { Injectable } from '@angular/core';
import { Temperature } from '../interfaces/temperature';

@Injectable({
  providedIn: 'root',
})
export class TemperatureDataService {
  temperature?: Temperature;

  constructor() {}
}
