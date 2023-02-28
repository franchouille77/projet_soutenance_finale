import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WorldCity } from '../interfaces/worldCity';
import { Temperature } from '../interfaces/temperature';

@Injectable({
  providedIn: 'root',
})
export class ApiBddService {
  constructor(private http: HttpClient) {}

  getWorldCityByName(worldCity: WorldCity): Observable<WorldCity> {
    return this.http.post<WorldCity>(
      'http://localhost:8080/api/getWorldCityByNameAndCountryAndCoords',
      worldCity
    );
  }

  addWorldCity(worldCity: WorldCity): Observable<WorldCity> {
    return this.http.post<WorldCity>(
      'http://localhost:8080/api/addWorldCity',
      worldCity
    );
  }

  addTemperature(temperature: Temperature): Observable<Temperature> {
    return this.http.post<Temperature>(
      'http://localhost:8080/api/addTemperature',
      temperature
    );
  }

  deleteTemperature(id: number): Observable<void> {
    return this.http.get<void>(
      'http://localhost:8080/api/deleteTemperatureById?id=' + id
    );
  }

  getAllTemperatures(): Observable<Temperature[]> {
    return this.http.get<Temperature[]>(
      'http://localhost:8080/api/getAllTemperatures'
    );
  }
}
