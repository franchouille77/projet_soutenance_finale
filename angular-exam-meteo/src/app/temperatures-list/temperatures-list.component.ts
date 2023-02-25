import { Component, OnInit } from '@angular/core';
import { Temperature } from '../interfaces/temperature';
import { ApiBddService } from '../services/api-bdd.service';
import { Router } from '@angular/router';
import { TemperatureDataService } from '../services/temperature-data.service';

@Component({
  selector: 'app-temperatures-list',
  templateUrl: './temperatures-list.component.html',
  styleUrls: ['./temperatures-list.component.css'],
})
export class TemperaturesListComponent implements OnInit {
  constructor(
    private apiBddService: ApiBddService,
    private router: Router,
    private temperatureDataService: TemperatureDataService
  ) {}

  temperatures?: Temperature[];

  ngOnInit(): void {
    this.apiBddService.getAllTemperatures().subscribe((data) => {
      this.temperatures = data;
      console.log(data);
    });
  }

  goToDetails(temp?: Temperature) {
    console.log('temp', temp);
    this.temperatureDataService.temperature = temp;
    this.router.navigate(['/tempDetails']);
  }
}
