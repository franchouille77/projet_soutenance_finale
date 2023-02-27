import { Component } from '@angular/core';
import { MapService } from '../services/map.service';
import { Map, AnySourceImpl } from 'mapbox-gl';
import { environment } from 'src/environments/environment.development';
import { CustomGeoJson, CustomFeatureCollection } from '../interfaces/map';
import { FeatureCollection } from 'geojson';
import { ApiBddService } from '../services/api-bdd.service';
import { Temperature } from '../interfaces/temperature';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
})
export class MapBoxComponent {
  map!: Map; // la carte
  style: string = 'mapbox://styles/mapbox/streets-v12'; // style de la carte
  lat: number = 46.5; // latitude à l'initialisation
  lng: number = 2.5; // longitude à l'initialisation
  message: string = 'Bonjour'; // message à afficher sous le marqueur

  source: any; // source pour créer un marqueur (image)
  markers: CustomGeoJson[] = []; // liste des marqueurs
  imageNames: string[] = [];

  iconId: string = '10d'; // icône représentant la météo
  sourceId: string = 'weather'; // nom par défaut de la source de données
  layerId: string = 'weather-layer'; // nom par défaut du layer

  temperatures?: Temperature[];

  constructor(
    private mapService: MapService,
    private apiBddService: ApiBddService
  ) {}

  ngOnInit() {
    // zoom sur la localisation de l'utilisateur
    this.initializeMap();
    // récupération des marqueurs enregistrés en base de données
    this.loadMarkers();
  }

  loadMarkers(): void {
    this.apiBddService.getAllTemperatures().subscribe({
      next: (temperatures: Temperature[]) => {
        this.temperatures = temperatures;
        console.log('temperatures', temperatures);
      },
      complete: () => {
        this.temperatures?.forEach((temp) => {
          this.iconId = 'blue';
          this.markers.push(
            new CustomGeoJson(
              [temp.worldCity.lng, temp.worldCity.lat],
              temp.id,
              { message: temp.worldCity.city, image: this.iconId }
            )
          );
        });
      },
    });
  }

  loadAllImages() {
    this.markers.forEach((marker) => {
      this.loadImage(marker.properties.image);
    });
  }

  setMarkers(): void {
    // Mise à jour des données
    console.log('markers', this.markers);
    const features = new CustomFeatureCollection(this.markers);
    this.source.setData(features as FeatureCollection);
    console.log('source', this.source);
  }

  private initializeMap(): void {
    // Demande de localisation de l'utilisateur
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        // La fonction flyTo permet de se rendre à une destination
        // avec un effet de dézoom suivi d'un zoom
        this.map.flyTo({
          center: [this.lng, this.lat],
          zoom: 13,
        });
      });
    }
    // création de la carte
    this.buildMap();
  }

  buildMap() {
    // instance d'une carte
    this.map = new Map({
      // stocké dans le fichier environments/environment.development.ts
      accessToken: environment.mapbox.accessToken,
      container: 'map', // référence à la div dans le document HTML
      style: this.style,
      zoom: 5,
      center: [this.lng, this.lat],
    });

    // attente du chargement de la carte avant
    // d'effectuer quoi que ce soit
    this.map.on('load', () => {
      this.createSource();
      this.createLayer();
      this.setMarkers();
      this.loadAllImages();
      // pour chaque clic sur la carte
      this.map.on('click', (event) => {
        // récupération des coordonées du clic
        const coordinates: [number, number] = [
          event.lngLat.lng,
          event.lngLat.lat,
        ];
        console.log('clickcoords', coordinates);
        // création d'un nouveau marqueur
        const newMarker = new CustomGeoJson(coordinates, undefined, {
          message: this.message,
          image: this.iconId,
        });

        this.markers.push(newMarker);

        this.setMarkers();

        // ajout du marqueur en base de données
        /*  this.mapService.createMarker(newMarker).subscribe((data) => {
          this.markers.push(data);
          // Chargement de l'image du marqueur
          this.loadImage();
          // Ajout du marqueur sur la carte
          this.setMarkers();
        }); */
      });
    });
  }

  createLayer() {
    // ajout d'une couche permettant d'afficher le marqueur (l'image) sur la carte
    console.log('Creating layer', this.layerId);
    this.map.addLayer({
      id: this.layerId,
      type: 'symbol',
      source: this.sourceId, // référence à la source de données
      layout: {
        'icon-image': '{image}',
        'text-field': '{message}',
        'text-size': 12,
        'text-offset': [0, 2.5],
        'icon-offset': [-1, -2.5],
      },
      paint: {
        'text-color': '#f16624',
        'text-halo-color': '#fff',
        'text-halo-width': 2,
      },
    });
  }

  createSource() {
    // création des données nécessaires au placement de l'image
    const feature = new CustomFeatureCollection([]);

    // création d'une source permettant par la suite le placement de l'image
    this.map.addSource(this.sourceId, {
      type: 'geojson',
      data: feature as FeatureCollection,
    });

    this.source = this.map.getSource(this.sourceId);
    // même idée que les lignes précédentes
    // sauf que le contenu est décortiqué
    /*
    this.map.addSource('src' + geoJson.id, {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {
              message: this.message,
            },
            geometry: {
              type: 'Point',
              coordinates: [this.lng, this.lat],
            },
          },
        ],
      },
    });
    */
  }

  loadImage(imgId: string) {
    let url: string = `https://weather-icons.cleverapps.io/weather/markers/marker-${imgId}.png`;
    console.log(imgId);
    // Vérification si l'image est déjà chargée ou non
    if (imgId in this.imageNames) return;

    // téléchargement de l'image
    this.map.loadImage(url, (error, image) => {
      if (error) throw error;

      this.map.addImage(imgId, image!);
      this.imageNames.push(imgId);
    });
  }

  // suppression du marqueur de la base de données et de la carte
  /*   removeMarker(marker: CustomGeoJson) {
    this.mapService.removeMarker(marker.id).subscribe(() => {
      this.markers = this.markers.filter(
        (m: CustomGeoJson) => m.id !== marker.id
      );
      this.setMarkers();
    });
  } */

  // déplacement vers un marqueur
  flyTo(data: CustomGeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates,
      zoom: 13,
    });
  }
}
