import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-exam-meteo';

  routes = [
    { label: 'Météo', link: '/datasMeteo' },
    { label: 'Carte', link: '/mapBox' },
    //{ label: 'Ajouter une ville', link: '/addWorldCity' },
    //{ label: 'Ajouter une température', link: '/addTemperature' },
    {
      label: 'Liste des températures enregistrées',
      link: '/listTemperatures',
    },
  ];
}
