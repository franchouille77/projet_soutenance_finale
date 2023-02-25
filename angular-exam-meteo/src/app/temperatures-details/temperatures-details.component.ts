import { Component } from '@angular/core';
import { Temperature } from '../interfaces/temperature';
import { TemperatureDataService } from '../services/temperature-data.service';

@Component({
  selector: 'app-temperatures-details',
  templateUrl: './temperatures-details.component.html',
  styleUrls: ['./temperatures-details.component.css'],
})
export class TemperaturesDetailsComponent {
  temp?: Temperature;
  constructor(private temperatureDataService: TemperatureDataService) {
    this.temp = temperatureDataService.temperature;
  }
}
