import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { UserService } from '../services/user.service';
import { VehicleServiceService } from '../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import {AuthService} from '../services/auth.service';
import {DataService} from '../services/data.service';

let uId;
let userfullName;
let currentUserName;
let vehi;
var activate = false;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  newMessage:any;
  interval: any;
  allUsers: any[];
  allVehicles: any[];
  vehicleNumber: String;
  imeiNumber: String;
  vehicleDetails: String;
  isAdmin: any;
  columnNum: number;
  cardNum: number;
  userVal: number;
  vehicleVal: number;
  message: false;
  change: any;
  constructor(
    private getUsers: UserService,
    private getVehicles: VehicleServiceService,
    public dialog: MatDialog,
    private auth: AuthService,
    private data: DataService
  ) { };


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
    restClick(userId: any, name: string, userName: string) {
        const dialogRef = this.dialog.open(RestPasswordPopup, {
            height: '350px',
            width: '400px',
        });
        userfullName = name;
        uId = userId;
        currentUserName = userName;
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
  startAnimationForBarChart(chart) {
      let seq2: any, delays2: any, durations2: any;

      seq2 = 0;
      delays2 = 80;
      durations2 = 500;
      chart.on('draw', function(data) {
        if (data.type === 'bar') {
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

  deleteConfirmDialog(userId, name) {
    const dialogRef = this.dialog.open(DeleteUserPopup, {
      height: '350px',
      width: '400px',
    });
    uId = userId;
    userfullName = name;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  };

  updateDialog(vehicle) {
    vehi = vehicle;
    const dialogRef = this.dialog.open(UpdateVehiclePopup, {
      height: '400px',
      width: '600px',
    }, );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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
    this.showVehicle();

    this.interval = setInterval(() => {
      this.getUsers.getAllUsers().subscribe(result => {
        if (result.length !== this.userVal) {
          this.allUsers = result;
          this.userVal = result.length;
        }
      }
      );
    }, 1000);

    
    // for refreshing the user table
    this.interval = setInterval(() => {
      this.data.currentMessage2.subscribe(message=>this.newMessage=message);
      if(this.newMessage){
        this.showVehicle();
        this.data.changeMessage2(null);
      };
      // this.getUsers.getAllUsers().subscribe(result => {
      //   if (result.length !== this.userVal) {
      //     this.allUsers = result;
      //     this.userVal = result.length;
      //   }
      // }
      // );
    }, 1000);

    

    // this.interval = setInterval(() => {
    //   this.getVehicles.getAllVehicles().subscribe(result => {
    //       this.data.currentMessage.subscribe(message => this.message = message);
    //     if (result.vehicle.length !== this.vehicleVal || this.message) {
    //         this.allVehicles = result.vehicle;
    //         this.vehicleVal = result.vehicle.length;
    //         this.message = false;
    //     }
    //   }
    //   );
    // }, 1000);



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

  showVehicle(){
    this.getVehicles.getAllVehicles().subscribe(result => {
      this.allVehicles = result.vehicle;
      this.vehicleVal = result.vehicle.length;
    });
  }
  checkUserIsAdded(result) {

  }

}

@Component({
  selector: 'delete-user-popup',
  templateUrl: 'delete-user-popup.html',
})
export class DeleteUserPopup {
    public username: string;

    ngOnInit() {
        this.username = userfullName;
    }
  constructor(
    private delUser: UserService,
    private auth: AuthService
  ) { };
  deleteUser() {
    this.delUser.deleteUser(uId).subscribe(res => {
        if (res.success) {
            this.auth.displayMessage(res, 'success', 'top');
        } else {
            this.auth.displayMessage(res, 'danger', 'top');
        }
    });
  }
}


@Component({
    selector: 'rest-password-popup',
    templateUrl: 'rest-password-popup.html',
})
export class RestPasswordPopup {
    restUser: string;
    public username: string;
    constructor(
        private user: UserService,
        private auth: AuthService
    ) { };
    ngOnInit() {
      this.username = userfullName;
    }
    restPassword() {
        const userRestPasswordDetails = {
          userId : uId,
          userName : currentUserName
        };
        this.user.restPassword(userRestPasswordDetails).subscribe(res => {
            if (res.success) {
                this.auth.displayMessage(res, 'success', 'top');
            } else {
                this.auth.displayMessage(res, 'danger', 'top');
            }
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
    private updVehicles: VehicleServiceService,
    private auth: AuthService,
    private data: DataService
  ) { };
  updateVehicle() {
    const vehicleDetails = {
      vehicleNo: this.vehicleNo,
        Imie: this.deviceImei,
        userName: this.userName,
        details: this.vehicleDetails
    };
    console.log(vehicleDetails);
    this.updVehicles.updateVehicle(this.id, vehicleDetails).subscribe(res => {
      if (res.success) {
          this.data.changeMessage(true);
          this.auth.displayMessage(res, 'success', 'top');
      } else {
          console.log(res.err);
          this.auth.displayMessage(res, 'danger', 'top');
      }
    });
  }
}
