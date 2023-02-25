import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { countries, CountryRecord } from '../citiesCodeRecord';
import { WorldCity } from '../interfaces/worldCity';
import { MeteoService } from '../services/meteo.service';
import { ApiBddService } from '../services/api-bdd.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-world-city',
  templateUrl: './world-city.component.html',
  styleUrls: ['./world-city.component.css'],
})
export class WorldCityComponent {
  constructor(
    private meteoService: MeteoService,
    private apiBddService: ApiBddService,
    private snackBar: MatSnackBar
  ) {}

  countryNamesFromCodes: CountryRecord = countries;

  worldCityName = new FormControl();
  worldCity?: WorldCity;

  addCity() {
    this.meteoService.getMeteoByCity(this.worldCityName.value).subscribe({
      next: (data) => {
        const worldCity: WorldCity = {
          city: data.name,
          city_ascii: data.name,
          lat: data.coord.lat,
          lng: data.coord.lon,
          country: this.countryNamesFromCodes[data.sys.country],
          iso2: data.sys.country,
        };
        this.worldCity = worldCity;
        this.apiBddService.addWorldCity(worldCity).subscribe((data) => {
          console.log(data);
        });
      },
      error: () => {
        this.openSnackBar('Ville non trouvée par OpenWeather!', 5000);
      },
      complete: () => {
        console.log(this.worldCity);
        this.openSnackBar(
          'Ville enregistrée en BDD! (id: ' + this.worldCity?.id + ')',
          5000
        );
      },
    });
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }
}
