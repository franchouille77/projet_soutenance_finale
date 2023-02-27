import { Component } from '@angular/core';
import { Temperature } from '../interfaces/temperature';
import { MeteoService } from '../services/meteo.service';
import { ApiBddService } from '../services/api-bdd.service';
import { WorldCity } from '../interfaces/worldCity';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-temperature',
  templateUrl: './temperature.component.html',
  styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent {
  constructor(
    private meteoService: MeteoService,
    private apiBddService: ApiBddService,
    private snackBar: MatSnackBar
  ) {}

  worldCityName = new FormControl();
  temperatureValue = new FormControl();
  worldCity?: WorldCity;
  temperature?: Temperature;

  getCity() {
    this.meteoService.getMeteoByCity(this.worldCityName.value).subscribe({
      next: (data) => {
        const regionNamesInFrench = new Intl.DisplayNames(['fr'], {
          type: 'region',
        });
        const worldCity: WorldCity = {
          city: data.name,
          city_ascii: data.name,
          lat: data.coord.lat,
          lng: data.coord.lon,
          country: regionNamesInFrench.of(data.sys.country) || '', //si pas de nom de pays mettre '' dans country
          iso2: data.sys.country,
        };
        this.worldCity = worldCity;
        this.apiBddService.getWorldCityByName(worldCity).subscribe({
          next: (data) => {
            if (data.id == null)
              this.openSnackBar(
                "La ville existe chez OpenWeather mais n'est pas enregistrée en BDD. Ajoutez une ville pour pouvoir ajouter une température dans cette ville!",
                10000
              );
            else this.worldCity = data;
          },
          complete: () => {
            if (this.worldCity?.id) {
              this.openSnackBar(
                'Ville trouvée dans la BDD! (id: ' + this.worldCity.id + ')',
                5000
              );
              console.log(this.worldCity);
            }
          },
        });
      },
      error: () => {
        this.openSnackBar('Ville non trouvée par OpenWeather!', 5000);
      },
      complete: () => {
        console.log(this.worldCity);
      },
    });
  }

  addTemperature() {
    if (this.worldCity && this.temperatureValue.value && this.worldCity?.id) {
      const temperature: Temperature = {
        value: this.temperatureValue.value,
        worldCity: this.worldCity,
      };
      this.temperature = temperature;
      this.apiBddService.addTemperature(this.temperature).subscribe({
        next: (data) => {
          console.log(data);
          if (data.id) {
            this.temperature = data;
            this.openSnackBar(
              'Temperature enregistrée en BDD! (id: ' + data.id + ')',
              5000
            );
          }
        },
      });
    } else {
      this.openSnackBar(
        'Veuillez renseigner une Ville et une Temperature!',
        5000
      );
    }
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }
}
