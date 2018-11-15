import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    interval: any;
    lat = 7.2906;
    lng = 80.6337;
    markers = [];
    truckIcon: any;
    oldIndex = -1;
    dataAmount = 0;
    oldDataAmount = 0;
    userMarkers = [];
    allVehiclesResult: any;
    vehicleNumber: String;
    dateFrom: String;

    polylines = [];

    constructor(public vehicleDetails: MapService,
                public vehicles: VehicleServiceService) {
    }


    ngOnInit() {
            this.vehicleDetails.getTrackingData().subscribe(result => {
                this.getUserVehicles(result);
            });
    }

    getUserVehicles(result){
        this.allVehiclesResult = result;
    }

    
    private rebuildPolylines(result = []) {
        this.polylines = result;
        if (this.polylines !== []) {
            const len=this.polylines.length;
            for (let i = 0; i < len; i++) {
                console.log(i);
                if (this.polylines[i].trackingData[0].speed > 60) {
                    this.truckIcon = './src/assets/img/red-truck-front.png';
                } else if (this.polylines[i].trackingData[0].speed > 5) {
                    this.truckIcon = './src/assets/img/green-truck-front.png';
                } else {
                    this.truckIcon = './src/assets/img/yellow-truck-front.png';
                }
                this.polylines[i].routeVisibility = 0.0;
                const endMarker = {
                    imei: this.polylines[i].imeiNumber,
                    lat: this.polylines[i].trackingData[0].latitude,
                    lng: this.polylines[i].trackingData[0].longitude,
                    speed: this.polylines[i].trackingData[0].speed,
                    num: this.polylines[i].vehicleNumber,
                    tim: this.polylines[i].trackingData[0].date,
                    truckIcon: this.truckIcon
                };
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

    private customizeData(result = []) {
        this.markers = [];
        for (let i = 0; i < result.length; i++) {
            if (result[i].trackingData.length === 0) {
                result.splice(i, 1);
                i--;
            }
        }
            this.rebuildPolylines(result);
    }

    requestHistory() {
        const historyObj = {vehicleNumber: this.vehicleNumber, dateFrom: this.dateFrom};
        this.vehicleDetails.getVehicleHistory(historyObj).subscribe(result => {
            this.customizeData(result);
        });
    }
}

