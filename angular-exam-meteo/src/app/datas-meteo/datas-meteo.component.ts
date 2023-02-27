import { Component } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { Meteo } from '../interfaces/meteo';
import { FormControl } from '@angular/forms';
import { WorldCity } from '../interfaces/worldCity';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiBddService } from '../services/api-bdd.service';

@Component({
  selector: 'app-datas-meteo',
  templateUrl: './datas-meteo.component.html',
  styleUrls: ['./datas-meteo.component.css'],
})
export class DatasMeteoComponent {
  constructor(
    private meteoService: MeteoService,
    private snackBar: MatSnackBar,
    private apiBddService: ApiBddService
  ) {}

  worldCityName = new FormControl();
  lat = new FormControl();
  lon = new FormControl();

  meteo?: Meteo;
  worldCity?: WorldCity;

  getMeteoByCity(): void {
    this.meteoService.getMeteoByCity(this.worldCityName.value).subscribe({
      next: (data) => {
        this.meteo = data;
        this.showWorldCity(this.meteo);
      },
      error: () => {
        this.openSnackBar('Ville non trouvée par OpenWeather!', 5000);
      },
      complete: () => {
        console.log(this.meteo);
      },
    });
  }

  getMeteoByCoords(): void {
    this.meteoService
      .getMeteoByCoords(this.lat.value, this.lon.value)
      .subscribe((data) => {
        this.meteo = data;
        this.showWorldCity(this.meteo);
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
            this.showWorldCity(this.meteo);
            this.worldCityName.setValue(dataMeteo.name);
            console.log('Meteo', dataMeteo);
          });
        this.lat.setValue(position.coords.latitude);
        this.lon.setValue(position.coords.longitude);
      });
    }
  }

  addCity() {
    if (this.worldCity) {
      this.apiBddService.addWorldCity(this.worldCity).subscribe((data) => {
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
    }
  }

  showWorldCity(meteo: Meteo) {
    const regionNamesInFrench = new Intl.DisplayNames(['fr'], {
      type: 'region',
    });
    const worldCity: WorldCity = {
      city: meteo.name,
      city_ascii: meteo.name,
      lat: meteo.coord.lat,
      lng: meteo.coord.lon,
      country: regionNamesInFrench.of(meteo.sys.country) || '', //si pas de nom de pays mettre '' dans country
      iso2: meteo.sys.country,
    };
    this.worldCity = worldCity;
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }
}
