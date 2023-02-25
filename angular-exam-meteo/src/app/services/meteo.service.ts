import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Meteo } from '../interfaces/meteo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MeteoService {
  constructor(private http: HttpClient) {}

  private API_KEY: string = '8118ed6ee68db2debfaaa5a44c832918';

  getMeteoByCoords(loc: string[]): Observable<Meteo> {
    return this.http.get<Meteo>(
      `https://api.openweathermap.org/data/2.5/weather?lat=${loc[0]}&lon=${loc[1]}&lang=fr&units=metric&appid=` +
        this.API_KEY
    );
  }

  getMeteoByCity(city: string): Observable<Meteo> {
    return this.http.get<Meteo>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=fr&units=metric&appid=` +
        this.API_KEY
    );
  }
}
