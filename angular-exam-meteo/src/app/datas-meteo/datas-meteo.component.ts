import { Component } from '@angular/core';
import { MeteoService } from '../services/meteo.service';
import { Meteo } from '../interfaces/meteo';
import { IpService } from '../services/ip.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datas-meteo',
  templateUrl: './datas-meteo.component.html',
  styleUrls: ['./datas-meteo.component.css'],
})
export class DatasMeteoComponent {
  constructor(
    private meteoService: MeteoService,
    private ipService: IpService
  ) {}

  worldCityName = new FormControl();
  lat = new FormControl();
  lon = new FormControl();

  meteo?: Meteo;

  getMeteoByCity(): void {
    this.meteoService
      .getMeteoByCity(this.worldCityName.value)
      //exectution de plusieurs instructions avec next: et complete:
      .subscribe({
        next: (data) => (this.meteo = data),
        complete: () => console.log(this.meteo),
      });
  }

  getMeteoByCoords(): void {
    this.meteoService
      .getMeteoByCoords([this.lat.value, this.lon.value])
      //exectution de plusieurs instructions avec les accolades
      .subscribe((data) => {
        this.meteo = data;
        console.log(data);
      });
  }

  getMeteoByGeoloc(): void {
    this.ipService.getIpAdress().subscribe((dataIp) =>
      this.ipService.getIpInfo(dataIp.ip).subscribe((dataIpInfo) => {
        this.meteoService
          .getMeteoByCoords(dataIpInfo.loc.split(',', 2))
          .subscribe((dataMeteo) => {
            this.meteo = dataMeteo;
            console.log('Meteo');
            console.log(dataMeteo);
          });
        console.log('IpInfo');
        console.log(dataIpInfo);
        this.worldCityName.setValue(dataIpInfo.city);
        this.lat.setValue(dataIpInfo.loc.split(',', 2)[0]);
        this.lon.setValue(dataIpInfo.loc.split(',', 2)[1]);
      })
    );
  }
}
