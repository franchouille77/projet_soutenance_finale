import { Component } from '@angular/core';
import { Temperature } from '../interfaces/temperature';
import { TemperatureDataService } from '../services/temperature-data.service';
import { ApiBddService } from '../services/api-bdd.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-temperatures-details',
  templateUrl: './temperatures-details.component.html',
  styleUrls: ['./temperatures-details.component.css'],
})
export class TemperaturesDetailsComponent {
  temp?: Temperature;
  constructor(
    private temperatureDataService: TemperatureDataService,
    private apiBddService: ApiBddService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.temp = temperatureDataService.temperature;
  }

  deleteTemp(id?: number) {
    if (id)
      this.apiBddService.deleteTemperature(id).subscribe({
        next: () => {
          this.openSnackBar('Suppression éffectuée!', 2000);
          setTimeout(() => {
            this.router.navigate(['/tempDetails']);
          }, 1000);
        },
        error: () => {
          this.openSnackBar('Erreur lors de la supression!', 5000);
        },
      });
  }

  openSnackBar(message: string, duration: number) {
    this.snackBar.open(message, 'Fermer', {
      duration: duration,
    });
  }
}
