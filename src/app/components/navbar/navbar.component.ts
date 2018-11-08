import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { UserProfileComponent} from '../../user-profile/user-profile.component';
import { VehicleServiceService} from '../../services/vehicle-service.service';
import {MatDialog} from '@angular/material';
import { NotificationsComponent} from '../../notifications/notifications.component'
import {AuthService} from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { CheckPointService } from '../../services/check-point.service';


var vId;
var vehi;
declare var $: any;


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    isAdmin: any;
    profile: any;
    private listTitles: any[];
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(
        location: Location,
        private element: ElementRef,
        private router: Router,
        private getVehicles: VehicleServiceService,
        private auth: AuthService,
        private getUsers: UserService,
        public dialog: MatDialog
        ) {
      this.location = location;
      this.sidebarVisible = false;

    }


    ngOnInit(){
        this.isAdmin = this.auth.findUser();
        this.profile = this.auth.getProfileData();
        this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 2 );
      }
      titlee = titlee.split('/').pop();

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }

    clickMe(){
        // { path: '/user-profile', title: 'UserProfile',  icon:'person', class: '' };
    }

    addVehicleDialog() {
        const dialogRef = this.dialog.open(AddVehiclePopup,{
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      };


    logoutUser() {
        this.auth.logout();
        this.router.navigate(['/login']);
        window.location.reload();
        return false;
    }

    changePasswordDialog() {
        const dialogRef = this.dialog.open(AddUserPopUp, {
            height: '400px',
            width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    };

    addUserDialog() {
        const dialogRef = this.dialog.open(AddUserPopUp, {
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
    };

    addCheckPointDialog() {
        const dialogRef = this.dialog.open(AddCheckPointPopup,{
          height: '400px',
          width: '600px',
        });
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      };
}

@Component({
    selector: 'add-vehicle-popup',
    templateUrl: 'add-vehicle-popup.html',
  })
  export class AddVehiclePopup {
    vehicleNumber: String;
    imeiNumber: String;
    userId: String;
    vehicleDetails: String;
    allUser: any[];
    //notification: NotificationsComponent
    constructor(
      private addNewVehicles:VehicleServiceService,
      private getUsers: UserService
      //private notification: NotificationsComponent
    ) {
      this.getUsers.getAllUsers().subscribe(result=>
        this.allUser =result
        )
    };

    addVehicle(){
      const vehicleObj = {
        vehicleNumber:this.vehicleNumber,
        imeiNumber:this.imeiNumber,
        userId:this.userId,
        vehicleDetails:this.vehicleDetails
      }

      this.addNewVehicles.addNewVehicle(vehicleObj).subscribe(res=>{
        if(res.success){
          console.log(this.userId);

          const type = ['success'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "done_outline",
            message: "Successfully added<b> new vehicle</b> "

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
          //this.notification.showNotification('top','left');
        }
        else{
          const type = ['success'];
          //const color = Math.floor((Math.random() * 4) + 1);
          $.notify({
            icon: "done_outline",
            message: "Somthing went <b> wrong</b> "

          },{
            type: 'danger',
            timer: 4000,
            placement: {
                from: "top",
                align: "center"
            },
            template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
              '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">error</i></button>' +
              '<i class="material-icons" data-notify="icon">check_circle</i> ' +
              '<span data-notify="title">{1}</span> ' +
              '<span data-notify="message">{2}</span>' +
              '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
              '</div>' +
              '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
          });
        };
      });
    };
  }

  @Component({
    selector: 'add-user-popup',
    templateUrl: 'add-user-popup.html',
  })
  export class AddUserPopUp {
    fullName: String;
    user: String;
    address: String;
    contactNumber: String;
    emailAddress: String;
    userName: String;

    constructor(
      private addNewUser: UserService,
    ) { };

    addUser() {
      const userObj = {
        fullName : this.fullName,
        address: this.address,
        contactNumber: this.contactNumber,
        emailAddress: this.emailAddress,
        userName: this.userName
      };
      this.addNewUser.addNewUser(userObj).subscribe(res => {
        console.log(res);
      });
    };
  }

  @Component({
    selector: 'add-check-point-popup',
    templateUrl: 'add-check-point-popup.html',
  })
  export class AddCheckPointPopup {
    userName : String ;
    locationName : String ;
    locationType : String ;
    latitude : String ;
    longitude : String ;
    constructor(
      private addNewCheckPoints:CheckPointService,
    ) { };
    addCheckPoint(){
      const checkPointObj = {
        userName:this.userName,
        locationName:this.locationName,
        locationType:this.locationType,
        latitude:this.latitude,
        longitude:this.longitude
      }
      //console.log(checkPointObj);
      this.addNewCheckPoints.addNewCheckPoint(checkPointObj, this.userName).subscribe(res=>{
        console.log(res);
      });
    };
  }


