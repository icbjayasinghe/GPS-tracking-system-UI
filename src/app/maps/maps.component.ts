import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service'


@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    lat = 7.2906;
    lng = 80.6337;
    markers = [];
    truckIcon: any;
    polylines = [];
    vehicleDetails: any;

  constructor(private vehicleData: MapService) {}

  ngOnInit() {
      this.vehicleDetails = this.vehicleData.getTrackingData();
      if (this.vehicleDetails === []) {
          this.polylines = this.vehicleDetails;
      }
      this.rebuildPolylines();
  }

      /*onChooseLocation(event) {

          const newMarker = {
              lat: event.coords.lat,
              lng: event.coords.lng,
              draggable: false
          };

          this.lat = event.coords.lat;
          this.lng = event.coords.lng;
          console.log('Latitudes :' + this.lat);
          console.log('Longitudes :' + this.lng);
          this.markers.push(newMarker);

      }*/

    private rebuildPolylines() {
        if (this.polylines !== []) {
            for (let i = 0; i < this.polylines.length; i++) {

                if (this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].speed > 60) {
                    this.truckIcon = './src/assets/img/red-truck-front.png';
                } else if (this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].speed > 5) {
                    this.truckIcon = './src/assets/img/green-truck-front.png';
                } else {
                    this.truckIcon = './src/assets/img/yellow-truck-front.png';
                }
                const endMarker = {
                    imei: this.polylines[i].imeiNumber,
                    lat: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].lat,
                    lng: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].lng,
                    speed: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].speed,
                    truckIcon: this.truckIcon
                };
                this.markEndLocation(endMarker);
            }
        }
    }


    markEndLocation(endMarker: any) {
        this.markers.push(endMarker);
    }
  }

