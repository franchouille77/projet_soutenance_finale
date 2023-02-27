import { Component } from '@angular/core';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.css'],
})
export class MapBoxComponent {
  constructor(private mapService: MapService) {}
  
}
