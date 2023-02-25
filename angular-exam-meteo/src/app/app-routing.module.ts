import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatasMeteoComponent } from './datas-meteo/datas-meteo.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { TemperaturesDetailsComponent } from './temperatures-details/temperatures-details.component';
import { TemperaturesListComponent } from './temperatures-list/temperatures-list.component';
import { WorldCityComponent } from './world-city/world-city.component';
import { Temperature } from './interfaces/temperature';

const routes: Routes = [
  { path: 'datasMeteo', component: DatasMeteoComponent },
  { path: 'addWorldCity', component: WorldCityComponent },
  { path: 'addTemperature', component: TemperatureComponent },
  { path: 'listTemperatures', component: TemperaturesListComponent },
  { path: 'tempDetails', component: TemperaturesDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
