import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  worldCityName = new FormControl();
  worldCity?: WorldCity;

  addCity() {
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
        this.apiBddService.addWorldCity(worldCity).subscribe((data) => {
          console.log(data);
          if (data == null) {
            this.openSnackBar(
              "Ville déja enregistrée, impossible de l'ajouter à nouveau!",
              5000
            );
          } else {
            this.openSnackBar(
              'Ville enregistrée en BDD! (id: ' + data.id + ')',
              5000
            );
          }
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

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }
}
