import {Component, OnInit, } from '@angular/core';



declare const google: any;

interface Marker {
lat: number;
lng: number;
label?: string;
draggable?: boolean;
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css'],
    })
export class MapsComponent implements OnInit {

    lat = 7.2906;
    lng = 80.6337;
    markers = [];

    polylines = [
        {lat: 6.8575136, lng: 79.9088256},
        {lat: 6.856712, lng: 79.9100736},
        {lat: 6.8532288, lng: 79.9154048},
        {lat: 6.8523952, lng: 79.9179968},
        {lat: 6.8512784, lng: 79.9210304},
        {lat: 6.8498104, lng: 79.92336},
        {lat: 6.8483344, lng: 79.9256},
        {lat: 6.8476136, lng: 79.9266496},
        {lat: 6.8454536, lng: 79.9297344},
        {lat: 6.844792, lng: 79.9321472},
        {lat: 6.8450528, lng: 79.935008},
        {lat: 6.8453928, lng: 79.9439296},
        {lat: 6.8460832, lng: 79.9465088},
        {lat: 6.8437952, lng: 79.9568832},
        {lat: 6.8434248, lng: 79.9602304},
        {lat: 6.8418432, lng: 79.9632576},
        {lat: 6.8409368, lng: 79.9661504},
        {lat: 6.8393232, lng: 79.9720768},
        {lat: 6.8394216, lng: 79.9748992},
        {lat: 6.838888, lng: 79.97856},
        {lat: 6.8384088, lng: 79.9807104},
        {lat: 6.8375968, lng: 79.9840704},
        {lat: 6.8386896, lng: 79.986464},
        {lat: 6.8395912, lng: 79.9900288},
        {lat: 6.8397648, lng: 79.9930816},
        {lat: 6.8399632, lng: 79.9949632},
        {lat: 6.8404968, lng: 79.9972672},
        {lat: 6.8408984, lng: 79.9990848},
        {lat: 6.8412464, lng: 80.002496},
        {lat: 6.841308, lng: 80.0036928},
        {lat: 6.841532, lng: 80.00496},
        {lat: 6.8426768, lng: 80.0060864},
        {lat: 6.8448936, lng: 80.0097664},
        {lat: 6.8447152, lng: 80.0137088},
        {lat: 6.8446552, lng: 80.0147264}

    ];

  constructor() { }

  ngOnInit() {
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
      this.markers.push(newMarker);
    }

}
