import { Component, OnInit, ViewChild } from '@angular/core';
import { Temperature } from '../interfaces/temperature';
import { ApiBddService } from '../services/api-bdd.service';
import { Router } from '@angular/router';
import { TemperatureDataService } from '../services/temperature-data.service';
import { map } from 'rxjs/operators';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-temperatures-list',
  templateUrl: './temperatures-list.component.html',
  styleUrls: ['./temperatures-list.component.css'],
})
export class TemperaturesListComponent {
  displayedColumns: string[] = [
    'id',
    'value',
    'timestamp',
    'worldCity.city',
    'icon',
  ];
  temperatures: Temperature[] = [];
  temperaturesSource: MatTableDataSource<Temperature> = new MatTableDataSource(
    this.temperatures
  );

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private apiBddService: ApiBddService,
    private router: Router,
    private temperatureDataService: TemperatureDataService
  ) {
    this.apiBddService.getAllTemperatures().subscribe({
      next: (temperatures: Temperature[]) => {
        this.temperatures = temperatures;
        console.log('temperatures', temperatures);
      },
      complete: () => {
        this.temperaturesSource = new MatTableDataSource(this.temperatures);
        this.temperaturesSource.paginator = this.paginator;
        this.temperaturesSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    const filterValue = inputElement.value.trim().toLowerCase();
    this.temperaturesSource.filter = filterValue;
  }

  goToDetails(temp?: Temperature) {
    console.log('temp', temp);
    this.temperatureDataService.temperature = temp;
    this.router.navigate(['/tempDetails']);
  }
}
