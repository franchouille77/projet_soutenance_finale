import { Component } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { Meteo } from '../interfaces/meteo';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datas-meteo',
  templateUrl: './datas-meteo.component.html',
  styleUrls: ['./datas-meteo.component.css'],
})
export class DatasMeteoComponent {
  constructor(private meteoService: MeteoService) {}

  worldCityName = new FormControl();
  lat = new FormControl();
  lon = new FormControl();

  meteo?: Meteo;

  getMeteoByCity(): void {
    this.meteoService.getMeteoByCity(this.worldCityName.value).subscribe({
      next: (data) => (this.meteo = data),
      complete: () => console.log(this.meteo),
    });
  }

  getMeteoByCoords(): void {
    this.meteoService
      .getMeteoByCoords(this.lat.value, this.lon.value)
      .subscribe((data) => {
        this.meteo = data;
        console.log(data);
      });
  }

  getMeteoByGeoloc(): void {
    /*     navigator.geolocation.getCurrentPosition(
      function (coords) {
        alert('Location accessed');
        console.log('coords', coords);
      },
      function () {
        alert('User not allowed');
      },
      { timeout: 10000 }
    ); */
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('position', position);
        this.meteoService
          .getMeteoByCoords(position.coords.latitude, position.coords.longitude)
          .subscribe((dataMeteo) => {
            this.meteo = dataMeteo;
            this.worldCityName.setValue(dataMeteo.name);
            console.log('Meteo', dataMeteo);
          });
        this.lat.setValue(position.coords.latitude);
        this.lon.setValue(position.coords.longitude);
      });
    }
  }
}
