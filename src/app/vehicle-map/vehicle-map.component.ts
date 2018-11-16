import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {DataService} from '../services/data.service';
import { isEmpty } from 'rxjs/operators';
import { isUndefined } from 'util';

@Component({
  selector: 'app-vehicle-map',
  templateUrl: './vehicle-map.component.html',
  styleUrls: ['./vehicle-map.component.scss']
})
export class VehicleMapComponent implements OnInit {

  interval: any;
  lat = 7.2906;
  lng = 80.6337;
  markers = [];
  truckIcon: any;
  dotIcon: any;
  oldIndex = -1;
  dataAmount = 0;
  oldDataAmount = 0;
  polylines = [];
  
  

  

  constructor(
    public vehicleDetails: MapService,
    public vehicles: VehicleServiceService,
  ) { }

  ngOnInit() {
    this.interval = setInterval(() => {
      this.vehicleDetails.getTrackingData().subscribe(result => {
          this.moniterNewData(result);
      });
  }, 10000);
  }

private rebuildPolylines(result = []) {
    this.polylines = result;
    this.markers.length = 0;
    if (this.polylines !== []) {
        for (let i = 0; i < this.polylines.length; i++) {
            if (this.polylines[i].trackingData[0].speed > 60) {
                this.truckIcon = './src/assets/img/red-truck-front.png';
                this.dotIcon = '../../assets/img/dot red.png';
            } else if (this.polylines[i].trackingData[0].speed > 5) {
                this.truckIcon = './src/assets/img/green-truck-front.png';
                this.dotIcon = '.../../assets/img/dot green.png';
            } else {
                this.truckIcon = './src/assets/img/yellow-truck-front.png';
                this.dotIcon = '../../assets/img/dot.png';
            }
            this.polylines[i].routeVisibility = 0.0;
            const endMarker= {
                imei: this.polylines[i].imeiNumber,
                lat: this.polylines[i].trackingData[0].latitude,
                lng: this.polylines[i].trackingData[0].longitude,
                speed: this.polylines[i].trackingData[0].speed,
                num: this.polylines[i].vehicleNumber,
                tim: this.polylines[i].trackingData[0].date,
                fuel: false,
                temperature: false,
                truckIcon: this.truckIcon,
                dotIcon: this.dotIcon
            };
            if(this.polylines[i].trackingData[0].fuel){
                endMarker.fuel=this.polylines[i].trackingData[0].fuel;
            };
            if(this.polylines[i].trackingData[0].temperature){
                endMarker.temperature=this.polylines[i].trackingData[0].temperature;
            }

            this.markers[i] = endMarker;
        }
        if (this.oldIndex !== -1) {
            this.polylines[this.oldIndex].routeVisibility = 1.0;
        }
        console.log(this.polylines);
    }
}

setRouteVisible(iemi: any) {
    if (this.oldIndex !== -1) {
        this.polylines[this.oldIndex].routeVisibility = 0.0;
    }
    for (let i = 0; i < this.polylines.length; i++) {
        if (this.polylines[i].imeiNumber === iemi) {
            if (this.polylines[i].routeVisibility === 0.0) {
                this.oldIndex = i;
                this.polylines[i].routeVisibility = 1.0;
            }
        }
    }
}

private moniterNewData(result: any) {
    this.oldDataAmount = this.dataAmount;
    this.dataAmount = result.dataAmount;
    for (let i = 0; i < result.vehicle.length; i++) {
        if (result.vehicle[i].trackingData.length === 0) {
            result.vehicle.splice(i, 1);
            i--;
        }
    }
    if (this.dataAmount !== this.oldDataAmount) {
        this.rebuildPolylines(result.vehicle);
    }
}


}


