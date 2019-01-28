import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {DataService} from '../services/data.service';
import { isEmpty } from 'rxjs/operators';
import { isUndefined } from 'util';
import {CheckPointService} from '../services/check-point.service';
import {DeleteUserPopup} from '../dashboard/dashboard.component';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
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
  officeIcon: any;
  checkPoints = [];
  checkPointOwner: any;
  polylines = [];
  vehicleNumber: 'false';
  selectVehicle: string;


  constructor(
    private vehicleDetails: MapService,
    private checkPointDetails: CheckPointService,
    private dialog: MatDialog,
    private data: DataService,
  ) { }

  ngOnInit() {
      this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
          this.rebuildPolylines(result);
      });
      this.checkPointDetails.getAllCheckPoints(JSON.parse(localStorage.getItem('user')).userName).subscribe(result => {
          this.getCheckPoints(result);
      });
    this.interval = setInterval(() => {
      this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
          this.rebuildPolylines(result);
      });
  }, 30000);
      this.interval = setInterval(() => {
          this.data.currentMessage5.source.subscribe(translatedValue => {
              if (translatedValue) {
                  this.checkPointDetails.getAllCheckPoints(JSON.parse(localStorage.getItem('user')).userName).subscribe(result => {
                      this.getCheckPoints(result);
                      this.data.changeMessage5(false);
                  });
              }
          });
      }, 1000);
  }
private getCheckPoints(result: any) {
      this.officeIcon = '.../../assets/img/office.png';
      this.checkPoints = result.location;
      this.checkPointOwner = result._id;
}

    removeCheckPoint(checkPointId) {
      const locationDetails = {
          userId : this.checkPointOwner,
          locationId: checkPointId
      };
      this.data.changeMessage4(locationDetails);
        const dialogRef = this.dialog.open(DeleteCheckPointPopupComponent, {
            height: '350px',
            width: '400px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    };

private rebuildPolylines(result = []) {
    this.markers.length = 0;
    this.polylines = result;
        for (let i = 0; i < this.polylines.length; i++) {
            if (this.polylines[i].trackingData[0].speed > 60) {
                this.truckIcon = '.../../assets/img/red-truck-front.png';
                this.dotIcon = '../../assets/img/dot red.png';
            } else if (this.polylines[i].trackingData[0].speed > 5) {
                this.truckIcon = '.../../assets/img/green-truck-front.png';
                this.dotIcon = '.../../assets/img/dot green.png';
            } else {
                this.truckIcon = '.../../assets/img/yellow-truck-front.png';
                this.dotIcon = '../../assets/img/dot.png';
            }
            this.polylines[i].routeVisibility = 0.0;
            const endMarker = {
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
            if (this.polylines[i].trackingData[0].fuel) {
                endMarker.fuel = this.polylines[i].trackingData[0].fuel;
            }
            if (this.polylines[i].trackingData[0].temperature) {
                endMarker.temperature = this.polylines[i].trackingData[0].temperature;
            }

            this.markers[i] = endMarker;
        }
}

    requestRoute(vehicleNumber: any) {
      this.vehicleNumber = vehicleNumber;
        this.vehicleDetails.getTrackingData(this.vehicleNumber).subscribe(result => {
            this.polylines = result;
        });
}

search() {
this.markers = this.markers.filter(res => {
    return res.num.toLocaleLowerCase().match(this.selectVehicle.toLocaleLowerCase());
});
} }


@Component({
    selector: 'delete-checkPoint-popup',
    templateUrl: 'delete-checkPoint-popup.html',
})
export class DeleteCheckPointPopupComponent {
    constructor(
        private delVehicles: VehicleServiceService,
        private data: DataService,
        private auth: AuthService,
        private checkPointDetails: CheckPointService

    ) { };

    deleteCheckPoint() {
        this.data.currentMessage4.source.subscribe(translatedValue => {
            const checkPointDetails = translatedValue;
            this.checkPointDetails.deleteCheckPoint(checkPointDetails).subscribe(result => {
                if (result.success) {
                    this.data.changeMessage5(true);
                    this.auth.displayMessage(result, 'success', 'top');
                } else {
                    this.auth.displayMessage(result, 'danger', 'top');
                }
            });
        });
    }

}


