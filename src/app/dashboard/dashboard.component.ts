import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { UserService } from '../services/user.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';

let uId;
var vId;
var vehi;
declare var $: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  interval: any;
  allUsers: any[];
  menuItems: any[];
  allVehicles: any[];
  vehicleNumber: String;
  imeiNumber: String;
  vehicleDetails: String;
  isAdmin: any;
  columnNum: number;
  cardNum: number;
  userVal: number
  vehicleVal: number
  constructor(
    private getUsers: UserService,
    private getVehicles: VehicleServiceService,
    public dialog: MatDialog,
    private auth: AuthService
  ) { };


  startAnimationForLineChart(chart){
      let seq: any, delays: any, durations: any;
      seq = 0;
      delays = 80;
      durations = 500;

      chart.on('draw', function(data) {
        if(data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 600,
              dur: 700,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: Chartist.Svg.Easing.easeOutQuint
            }
          });
        } else if(data.type === 'point') {
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
  startAnimationForBarChart(chart){
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if(data.type === 'bar'){
            seq2++;
            data.element.animate({
              opacity: {
                begin: seq2 * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            });
        }
      });

      seq2 = 0;
  };

  deleteConfirmDialog(userId) {
    const dialogRef = this.dialog.open(DeleteUserPopup, {
      height: '350px',
      width: '400px',
    });
    uId = userId;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      console.log( userId);
    });
  };

  updateDialog(vehicle){
    vehi = vehicle;
    const dialogRef = this.dialog.open(UpdateVehiclePopup,{
      height: '400px',
      width: '600px',
    },);
    
    
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //console.log(vehi);
    });
    //console.log(vehi);
    //this.vehicleDetails=vehi;
    
  }


  
  ngOnInit() {
    this.isAdmin = this.auth.findUser();
    if (this.isAdmin) {
      this.columnNum = 6;
      this.cardNum = 3;
    } else {
      this.columnNum = 12;
      this.cardNum = 4;
    }
    this.getUsers.getAllUsers().subscribe(result => {
      this.allUsers = result;
      this.userVal = result.length;
    });
    this.getVehicles.getAllVehicles().subscribe(result=>{
      this.allVehicles = result;
      this.vehicleVal = result.length;
    });
    //for refreshing the user table
    this.interval = setInterval(() => {
      this.getUsers.getAllUsers().subscribe(result => {
        if(result.length != this.userVal){
          this.allUsers = result;
          this.userVal = result.length;
        }
      }
      );
    }, 1000);

    this.interval = setInterval(() => {
      this.getVehicles.getAllVehicles().subscribe(result => {
        if(result.length != this.vehicleVal){
          this.allVehicles = result;
          this.vehicleVal = result.length;
        }
      }
      );
    }, 1000);
 
 
   
      /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

    //   const dataDailySalesChart: any = {
    //       labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    //       series: [
    //           [12, 17, 7, 17, 23, 18, 38]
    //       ]
    //   };

    //  const optionsDailySalesChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
    //   }

    //   var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

    //   this.startAnimationForLineChart(dailySalesChart);


    //   /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

    //   const dataCompletedTasksChart: any = {
    //       labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
    //       series: [
    //           [230, 750, 450, 300, 280, 240, 200, 190]
    //       ]
    //   };

    //  const optionsCompletedTasksChart: any = {
    //       lineSmooth: Chartist.Interpolation.cardinal({
    //           tension: 0
    //       }),
    //       low: 0,
    //       high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
    //       chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
    //   }

    //   var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

    //   // start animation for the Completed Tasks Chart - Line Chart
    //   this.startAnimationForLineChart(completedTasksChart);



    //   /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

    //   var datawebsiteViewsChart = {
    //     labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
    //     series: [
    //       [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]

    //     ]
    //   };
    //   var optionswebsiteViewsChart = {
    //       axisX: {
    //           showGrid: false
    //       },
    //       low: 0,
    //       high: 1000,
    //       chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
    //   };
    //   var responsiveOptions: any[] = [
    //     ['screen and (max-width: 640px)', {
    //       seriesBarDistance: 5,
    //       axisX: {
    //         labelInterpolationFnc: function (value) {
    //           return value[0];
    //         }
    //       }
    //     }]
    //   ];
    //   var websiteViewsChart = new Chartist.Bar('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //   //start animation for the Emails Subscription Chart
    //   this.startAnimationForBarChart(websiteViewsChart);
  }
  checkUserIsAdded(result){

  }

}

@Component({
  selector: 'delete-user-popup',
  templateUrl: 'delete-user-popup.html',
})
export class DeleteUserPopup {
  constructor(
    private delUser: UserService,
  ) { };
  deleteUser() {
    this.delUser.deleteUser(uId).subscribe(res => {
      console.log(res);
    });
  }
}


@Component({
  selector: 'update-vehicle-popup',
  templateUrl: 'update-vehicle-popup.html',
})
export class UpdateVehiclePopup {
  id = vehi._id;
  vehicleNo = vehi.vehicleNumber;
  deviceImei = vehi.imeiNumber;
  userName = vehi.userName;
  vehicleDetails = vehi.vehicleDetails;
  constructor(
    private updVehicles:VehicleServiceService
  ) { };
  updateVehicle(){
    var vehicleObj = { 
      vehicleNo:this.vehicleNo,
	    Imie:this.deviceImei,
	    userName:this.userName,
	    details:this.vehicleDetails
    }
    console.log(vehi);
    this.updVehicles.updateVehicle(this.id,vehicleObj).subscribe(res=>{
      if(res.success){
        //const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Vehicle successfully <b> updated</b> "

      },{
          type: 'success',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">check_circle</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });

      }
      else{
        const type = ['success'];
        //const color = Math.floor((Math.random() * 4) + 1);
        $.notify({
          icon: "done_outline",
          message: "Successfully added<b> new vehicle</b> "

      },{
          type: 'danger',
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">error</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
        

      }
    });
    //console.log(this.id);
    // this.delVehicles.deleteVehicle(vId).subscribe(res=>{
    //   console.log(res);
    // });
  }
}