import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AgmCoreModule } from '@agm/core';
// import { LogComponent} from '../../log/log.component';
import { VehicleListComponent } from '../../vehicle-list/vehicle-list.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { CheckPointListComponent } from '../../check-point-list/check-point-list.component';
import { VehicleMapComponent} from '../../vehicle-map/vehicle-map.component'

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatAutocompleteModule,
  MatSelectModule
} from '@angular/material';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatButtonModule,
    MatRippleModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
      AgmCoreModule.forRoot({apiKey: 'AIzaSyDVlAsbOreXu07Sct_--NMYuJ8hxyzJZi0'})
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    VehicleListComponent,
    UserListComponent,
    CheckPointListComponent,
    VehicleMapComponent
    // LogComponent,
  ]
})

export class AdminLayoutModule {}
