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
    allVehiclesResult:any;
    vehicleId:String;
    dateFrom:String;
    dateTo:String;

    polylines = [];

    constructor(public vehicleDetails: MapService,
                public vehicles: VehicleServiceService) {
    }


    ngOnInit() {
        this.interval = setInterval(() => {
            this.vehicleDetails.getTrackingData().subscribe(result => {
                this.moniterNewData(result);
            });
        }, 10000);

        this.vehicles.getAllVehicles().subscribe(result=>{
            console.log(result);
            this.allVehiclesResult = result;

        })

    }

    onChooseLocation(event) {

        const newMarker = {
            lat: event.coords.lat,
            lng: event.coords.lng,
            draggable: false
        };

        this.lat = event.coords.lat;
        this.lng = event.coords.lng;
        console.log('Latitudes :' + this.lat);
        console.log('Longitudes :' + this.lng);
        this.userMarkers.push(newMarker);

    }

    private rebuildPolylines(result = []) {
        this.polylines = result;
        if (this.polylines !== []) {
            for (let i = 0; i < this.polylines.length; i++) {
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

    private moniterNewData(result = []) {
        this.oldDataAmount = this.dataAmount;
        this.dataAmount = 0;
        for (let i = 0; i < result.length; i++) {
            console.log(i);
            this.dataAmount = this.dataAmount + result[i].trackingData.length;
            if (result[i].trackingData.length === 0) {
                result.splice(i, 1);
                i--;
            }
            console.log(result[i].trackingData.length);
            console.log(result.length);
            console.log(i);
        }
        if (this.dataAmount !== this.oldDataAmount) {
            this.rebuildPolylines(result);
        }
    }
    
    requestHistory(){
        var historyObj={vehicleId:this.vehicleId, dateFrom:this.dateFrom, dateTo:this.dateTo};
        console.log(historyObj);
    }
}

