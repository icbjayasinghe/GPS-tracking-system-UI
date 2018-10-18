import { Component, OnInit } from '@angular/core';
import { MapService} from '../services/map.service'


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

    polylines = []; /*[
        {imeiNumber: 356307045861738,
            trackingData: [
        {lat: 6.8575136, lng: 79.9088256, speed: 2},
        {lat: 6.856712, lng: 79.9100736, speed: 46},
        {lat: 6.8532288, lng: 79.9154048, speed: 47},
        {lat: 6.8523952, lng: 79.9179968, speed: 30},
        {lat: 6.8512784, lng: 79.9210304, speed: 45},
        {lat: 6.8498104, lng: 79.92336, speed: 22},
        {lat: 6.8483344, lng: 79.9256, speed: 1},
        {lat: 6.8476136, lng: 79.9266496, speed: 8},
        {lat: 6.8454536, lng: 79.9297344, speed: 9},
        {lat: 6.844792, lng: 79.9321472, speed: 34},
        {lat: 6.8450528, lng: 79.935008, speed: 34},
        {lat: 6.8453928, lng: 79.9439296, speed: 32},
        {lat: 6.8460832, lng: 79.9465088, speed: 43},
        {lat: 6.8437952, lng: 79.9568832, speed: 30}
        ]
        },
        {imeiNumber: 356307045863458,
            trackingData: [{lat: 6.8434248, lng: 79.9602304, speed: 40},
                {lat: 6.8418432, lng: 79.9632576, speed: 7},
                {lat: 6.8409368, lng: 79.9661504, speed: 16},
                {lat: 6.8393232, lng: 79.9720768, speed: 47},
                {lat: 6.8394216, lng: 79.9748992, speed: 40},
                {lat: 6.838888, lng: 79.97856, speed: 46},
                {lat: 6.8384088, lng: 79.9807104, speed: 39},
                {lat: 6.8375968, lng: 79.9840704, speed: 50},
                {lat: 6.8386896, lng: 79.986464, speed: 42},
                {lat: 6.8395912, lng: 79.9900288, speed: 50},
                {lat: 6.8397648, lng: 79.9930816, speed: 35},
                {lat: 6.8399632, lng: 79.9949632, speed: 27},
                {lat: 6.8404968, lng: 79.9972672, speed: 26},
                {lat: 6.8408984, lng: 79.9990848, speed: 27},
                {lat: 6.8412464, lng: 80.002496, speed: 7},
                {lat: 6.841308, lng: 80.0036928, speed: 25},
                {lat: 6.841532, lng: 80.00496, speed: 8},
                {lat: 6.8426768, lng: 80.0060864, speed: 19},
                {lat: 6.8448936, lng: 80.0097664, speed: 42},
                {lat: 6.8447152, lng: 80.0137088, speed: 21},
                {lat: 6.8446552, lng: 80.0147264, speed: 10},
                {lat: 6.8405832, lng: 80.0216448, speed: 5}
            ]
        }
    ];*/

  constructor(public vehicleDetails: MapService) {}


  ngOnInit() {
    //   this.vehicleDetails.getTrackingData().subscribe(result => {
    //       this.rebuildPolylines(result);
    //   });

      this.interval = setInterval(() => {
        this.vehicleDetails.getTrackingData().subscribe(result => {
            this.rebuildPolylines(result);
        });
      }, 1000);

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

    private rebuildPolylines(result = []) {
        this.polylines = result;
        if (this.polylines !== []) {
            console.log(this.polylines);
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
                    lat: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].latitude,
                    lng: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].longitude,
                    speed: this.polylines[i].trackingData[this.polylines[i].trackingData.length - 1].speed,
                    truckIcon: this.truckIcon
                };
                this.markers[i] = endMarker;
            }
        }
    }
  }

