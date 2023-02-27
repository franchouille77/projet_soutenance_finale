import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { DatasMeteoComponent } from './datas-meteo/datas-meteo.component';
import { WorldCityComponent } from './world-city/world-city.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperaturesListComponent } from './temperatures-list/temperatures-list.component';
import { TemperaturesDetailsComponent } from './temperatures-details/temperatures-details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { CdkTableModule } from '@angular/cdk/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MapBoxComponent } from './map-box/map-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DatasMeteoComponent,
    WorldCityComponent,
    TemperatureComponent,
    TemperaturesListComponent,
    TemperaturesDetailsComponent,
    MapBoxComponent,
  ],
  imports: [
    MatTabsModule,
    MatInputModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    CdkTableModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
