import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {AuthService} from '../services/auth.service';



@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {
    lat = 7.2906;
    lng = 80.6337;
    markers = {};
    truckIcon: any;
    userMarkers = [];
    allVehiclesResult: any;
    vehicleNumber: String;
    dateFrom: String;
    routeVisibility = 0.0;

    polylines = [];

    constructor(public vehicleDetails: MapService,
                public vehicles: VehicleServiceService,
                private auth: AuthService) {
    }


    ngOnInit() {
            this.vehicles.getVehicleList().subscribe(result => {
                this.getUserVehicles(result);
            });
    }

    getUserVehicles(result) {
        this.allVehiclesResult = result;
    }

    private rebuildPolylines(result: any) {
            console.log(result);
            this.polylines = result[0].trackingData;
                if (this.polylines[0].speed > 60) {
                    this.truckIcon = './src/assets/img/red-truck-front.png';
                } else if (this.polylines[0].speed > 5) {
                    this.truckIcon = './src/assets/img/green-truck-front.png';
                } else {
                    this.truckIcon = './src/assets/img/yellow-truck-front.png';
                }
        this.routeVisibility = 0.0;
            this.markers = {
                    lat: this.polylines[0].latitude,
                    lng: this.polylines[0].longitude,
                    speed: this.polylines[0].speed,
                    num: result[0].vehicleNumber,
                    date: this.polylines[0].date,
                    fuel: false,
                    temperature: false,
                    truckIcon: this.truckIcon
                };

            if(this.polylines[0].fuel){
                this.markers={fuel:this.polylines[0].fuel};
            };
            if(this.polylines[0].temperature){
                this.markers={temperature:this.polylines[0].temperature};
            }    
            console.log(this.markers);
    }

    setRouteVisible() {
            this.routeVisibility = 1.0;
    }


    requestHistory() {
        const historyObj = {vehicleNumber: this.vehicleNumber, dateFrom: this.dateFrom};
        this.vehicleDetails.getVehicleHistory(historyObj).subscribe(result => {
            if (!result.success) {
                this.polylines = [];
                const empty = {};
                this.markers = {
                    truckIcon: 'false'
                };
                this.auth.displayMessage(result, 'warning', 'top');
            } else {
                this.rebuildPolylines(result.historyRes);
            }
        });
    }
}

