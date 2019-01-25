import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {AuthService} from '../services/auth.service';
import * as Chartist from 'chartist';
import {CheckPointService} from '../services/check-point.service';



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
    isSelectVehicle = false;
    polylines = [];
    officeIcon: any;
    checkPoints = [];
    distance: any;

    constructor(public vehicleDetails: MapService,
                public vehicles: VehicleServiceService,
                private auth: AuthService,
                private checkPointDetails: CheckPointService) {
    }


    ngOnInit() {
            this.vehicles.getVehicleList().subscribe(result => {
                this.getUserVehicles(result);
            });
        this.checkPointDetails.getAllCheckPoints(JSON.parse(localStorage.getItem('user')).userName).subscribe(result => {
            this.getCheckPoints(result.location);
        });
    }

    private getCheckPoints(result = []) {
        this.officeIcon = '.../../assets/img/office.png';
        this.checkPoints = result;
    }

    startAnimationForLineChart(chart) {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;
    
        chart.on('draw', function(data) {
          if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          } else if (data.type === 'point') {
                seq++;
                data.element.animate({
                  opacity: {
                    begin: seq * delays,
                    dur: durations,
                    from: 0,
                    to: 1,
                    easing: 'ease'
                  }
                });
            }
        });
    
        seq = 0;
    };
      

    getUserVehicles(result) {
        this.allVehiclesResult = result;
    }

    private rebuildPolylines(result: any) {
            this.distance = result[0].distance.toFixed(3);
            console.log(result);
            this.polylines = result[0].trackingData;
                if (this.polylines[0].speed > 60) {
                    this.truckIcon = '.../../assets/img/red-truck-front.png';
                } else if (this.polylines[0].speed > 5) {
                    this.truckIcon = '.../../assets/img/green-truck-front.png';
                } else {
                    this.truckIcon = '.../../assets/img/yellow-truck-front.png';
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

            if (this.polylines[0].fuel) {
                this.markers = {fuel: this.polylines[0].fuel};
            }
            if (this.polylines[0].temperature) {
                this.markers = {temperature: this.polylines[0].temperature};
            }
    }

    setRouteVisible() {
            this.routeVisibility = 1.0;
    }


    requestHistory() {
        const historyObj = {vehicleNumber: this.vehicleNumber, dateFrom: this.dateFrom};
        this.vehicleDetails.getVehicleHistory(historyObj).subscribe(result => {
            if (!result.success) {
                this.polylines = [];
                this.isSelectVehicle = false;
                this.markers = {
                    truckIcon: 'false'
                };
                this.auth.displayMessage(result, 'warning', 'top');
            } else {
                this.rebuildPolylines(result.historyRes);
                this.isSelectVehicle = true;

                let speed =[];
                let trackingDataLen = result.historyRes[0].trackingData.length
                for(var i=0; i<trackingDataLen; i++){
                    speed[i]=result.historyRes[0].trackingData[i].speed;
                }
                const dataCompletedTasksChart: any = {
                    // labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
                    series: [speed]
                    
                };
                
                const otherCh: any = {
                    grid: "++",
                    point:"#",
                    
                }

                const optionsCompletedTasksChart: any = {
                    axisX: {
                        showGrid: false
                    },
                    low: 0,
                    showPoint: false,
                    showLine:true,
                    fullHight:true,
                    fullWidth:true,
                    lineSmooth:true,
                    ticks:[5,45],
                    chartPadding: { top: 5, right: 0, bottom: 0, left: 0},
                    //classNames:otherCh
                    
                }
          
                var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
          
                // start animation for the Completed Tasks Chart - Line Chart
                this.startAnimationForLineChart(completedTasksChart);

                
            }
        });
    }
}

