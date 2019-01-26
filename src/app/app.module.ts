import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LogComponent, ForgotPasswordPopup, HelpSupportPopup } from './log/log.component';
import { DeleteCheckPointPopup } from './check-point-list/check-point-list.component'
import { MatButtonModule, MatInputModule, MatRippleModule, MatTooltipModule, MatDialogModule } from '@angular/material';
import { VehicleServiceService } from './services/vehicle-service.service';
import { UserService } from './services/user.service';
import { CheckPointService } from './services/check-point.service';
import { MapService} from './services/map.service';
import { AddVehiclePopup,AddUserPopUp, AddCheckPointPopup, ChangePasswordPopup} from './components/navbar/navbar.component';
import { AuthService} from './services/auth.service'
import {
    DashboardComponent,
    EditUserPopup,
    RestPasswordPopup,
    UserLogsPopup,
    VehicleSummaryPopup, VehicleTechnicalPopup
} from './dashboard/dashboard.component';

import { VehicleReportPopupComponent, StoppedLocationPopupComponent } from './report/report.component';



import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {MatDialog, MatDatepickerModule, MatAutocompleteModule, MatNativeDateModule, MatSelectModule} from '@angular/material';
import {DeleteCheckPointPopupComponent, VehicleMapComponent} from './vehicle-map/vehicle-map.component';
import { DeleteUserPopup, UpdateVehiclePopup, DeleteVehiclePopup } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import {DataService} from './services/data.service';
import { HttpClientModule} from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducer/vehicle.reducer';
import { ReportComponent } from './report/report.component';


@NgModule({
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSelectModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyDVlAsbOreXu07Sct_--NMYuJ8hxyzJZi0'}),
    StoreModule.forRoot({
      vehicle: reducer
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddVehiclePopup,
    AddUserPopUp,
    DeleteVehiclePopup,
    UpdateVehiclePopup,
    AddCheckPointPopup,
    DeleteUserPopup,
    DeleteCheckPointPopup,
    ChangePasswordPopup,
    RestPasswordPopup,
    UserLogsPopup,
    EditUserPopup,
    VehicleSummaryPopup,
    VehicleReportPopupComponent,
    VehicleTechnicalPopup,
    StoppedLocationPopupComponent,
    DeleteCheckPointPopupComponent
    ForgotPasswordPopup,
    LogComponent,
    HelpSupportPopup
  ],
  entryComponents: [
    AddVehiclePopup,
    AddUserPopUp,
    DeleteVehiclePopup,
    UpdateVehiclePopup,
    AddCheckPointPopup,
    DeleteUserPopup,
    DeleteCheckPointPopup,
    ChangePasswordPopup,
    RestPasswordPopup,
    UserLogsPopup,
    EditUserPopup,
    VehicleSummaryPopup,
    VehicleReportPopupComponent,
    VehicleTechnicalPopup,
    StoppedLocationPopupComponent,
    DeleteCheckPointPopupComponent
    ForgotPasswordPopup,
    HelpSupportPopup
  ],
  providers: [
      VehicleServiceService,
      UserService,
      CheckPointService,
      MapService,
      AuthService,
      AuthGuard,
      DataService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
