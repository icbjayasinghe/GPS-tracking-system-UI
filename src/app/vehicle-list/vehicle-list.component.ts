import { Component, OnInit } from '@angular/core';
import { VehicleServiceService} from '../services/vehicle-service.service'

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.scss']
})
export class VehicleListComponent implements OnInit {
  allVehicles: any[];
  constructor(
    private getVehicles:VehicleServiceService
  ) { }

  ngOnInit() {
    console.log(this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
      console.log(this.allVehicles);
    }));
  }

}
